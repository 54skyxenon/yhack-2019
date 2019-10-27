from flask import Flask, g, jsonify, request
from neo4j import GraphDatabase

TYPES = ['Year', 'State', 'City', 'Street', 'HouseNumber']
FIELDS = ['year', 'state', 'city', 'street', 'number']
ABRV = ['y', 's', 'c', 'st', 'h']
LIMIT = 100

# To be modified
uri = 'bolt://localhost:7687'
driver = GraphDatabase.driver(uri, auth=("neo4j", "yhack19"))

app = Flask(__name__)


class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


def get_db():
    if not hasattr(g, 'neo4j_db'):
        g.neo4j_db = driver.session()
    return g.neo4j_db


@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'neo4j_db'):
        g.neo4j_db.close()


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


# Generate the Cypher query given fields and page
def query(fields, pg):
    query_fields = []

    for i in range(len(FIELDS)):
        # Field names may be incorrect
        tmp = f'({ABRV[i]}:{TYPES[i]}'
        if fields[i] != '*':
            tmp += f' {{{FIELDS[i]}: \"{fields[i]}\"}}'
        tmp += ')'
        query_fields.append(tmp)

    query = '-[:CONTAINS]->'.join(query_fields)
    query += ' RETURN s.state'
    for i in range(2, len(FIELDS)):
        query += f', {ABRV[i]}.{FIELDS[i]}'

    skip = pg * LIMIT
    query = f'MATCH {query} ORDER BY h.number, st.street, c.city SKIP {skip} LIMIT {LIMIT};'
    return query


@app.route('/query', methods=['GET'])
def get_query():
    db = get_db()

    f = request.form
    fields = [f['year'], f['state'], f['city'], f['street'], f['num']]
    page = int(f['page']) if f['page'] else 0
    results = db.run(query(fields, page))

    res = []
    for record in results:
        res.append(record)

    return jsonify(res)


@app.route('/diff', methods=['GET'])
def diff_query():
    db = get_db()

    f = request.form
    fields = [f['state'], f['city'], f['street'], f['num']]
    page = 0

    y1 = int(f['year1']) if f['year1'] else 0
    y2 = int(f['year2']) if f['year2'] else 0

    if y1 == y2:
        raise InvalidUsage('Provide different years for address comparison!', status_code=400)

    set1 = {x for x in db.run(query([y1] + fields, page))}
    set2 = {x for x in db.run(query([y2] + fields, page))}

    res = {}
    res['sim'] = set1 & set2
    res['diff'] = set1 ^ set2
    print(res)

    return jsonify(res)