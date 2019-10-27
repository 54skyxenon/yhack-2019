from flask import Flask, g, jsonify, request
from neo4j import GraphDatabase

TYPES = ['State', 'City', 'Street', 'HouseNumber']
FIELDS = ['state', 'city', 'street', 'number']
ABRV = ['s', 'c', 'st', 'h']
LIMIT = 50

# To be modified
uri = 'bolt://34.95.39.76:7687'
# uri = 'bolt://localhost:7687'
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
def query(fields, year, page):
    query = ''
    for i in range(len(FIELDS)):
        query += f'MATCH (y:Year {{year: \'{year}\'}})-[:CONTAINS]-({ABRV[i]}:{TYPES[i]}'
        if fields[i] != '*':
            query += f' {{{FIELDS[i]}: \'{fields[i]}\'}}'
        query += ')\n'

    skip = page * LIMIT
    query += f'RETURN s.state AS s, c.city AS c, st.street AS st, h.number AS n '
    query += f'ORDER BY n, st, c, s SKIP {skip} LIMIT {LIMIT};'
    return query


def parse_addr(addr):
    num = ''
    street = ''
    addr = addr.split(' ')

    if 'PO BOX' in addr:
        return (addr[2], 'PO BOX')

    if addr[0] == '*':
        if len(addr) == 1:
            return ('*', '*')
        return ('*', ' '.join(addr[1:]))

    if re.search('^[0-9]+$', addr[0]):
        return (addr[0], ' '.join(addr[1:]))

    return ('', ' '.join(addr))


@app.route('/query', methods=['GET'])
def get_query():
    db = get_db()
    f = request.form

    # Parse street and st number from st address
    (num, street) = parse_addr(f['address'])

    fields = [f['state'], f['city'], street, num]
    year = int(f['year']) if f['year'] else 0
    page = int(f['page']) if f['page'] else 0
    results = db.run(query(fields, year, page))

    res = []
    for record in results:
        res.append(record)

    return jsonify(res)


@app.route('/diff', methods=['GET'])
def diff_query():
    db = get_db()
    f = request.form

    (num, street) = parse_addr(f['address'])
    fields = [f['state'], f['city'], street, num]
    page = int(f['page']) if f['page'] else 0

    y1 = int(f['year1']) if f['year1'] else 0
    y2 = int(f['year2']) if f['year2'] else 0

    if y1 == y2:
        raise InvalidUsage('Provide different years for address comparison!', status_code=400)

    set1 = {x for x in db.run(query(fields, y1, page))}
    set2 = {x for x in db.run(query(fields, y2, page))}

    res = {}
    res['sim'] = list(set1 & set2)
    res['diff'] = list(set1 ^ set2)

    return jsonify(res)