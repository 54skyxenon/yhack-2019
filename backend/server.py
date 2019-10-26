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


def get_db():
    if not hasattr(g, 'neo4j_db'):
        g.neo4j_db = driver.session()
    return g.neo4j_db


@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'neo4j_db'):
        g.neo4j_db.close()


def get_query(fields, pg):
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
def simple_query():
    db = get_db()

    f = request.form
    fields = [f['year'], f['state'], f['city'], f['street'], f['num']]
    page = int(f['page']) if f['page'] else 0
    results = db.run(get_query(fields, page))

    res = []
    for record in results:
        res.append(record)

    return jsonify(res) if res else None
