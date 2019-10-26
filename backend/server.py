from flask import Flask, g, Response, request
from neo4j import GraphDatabase

FIELDS = ['Year', 'State', 'City', 'Street', 'HouseNumber']
ABBRV = ['y', 's', 'c', 'st', 'h']
LIMIT = 100

# To be modified
uri = 'bolt://localhost:7687'
driver = GraphDatabase.driver(uri, auth=("neo4j", "password"))

app = Flask(__name__)


def get_db():
    if not hasattr(g, 'neo4j_db'):
        g.neo4j_db = driver.session()
    return g.neo4j_db


@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'neo4j_db'):
        g.neo4j_db.close()


def get_query(fields):
    query_fields = []

    for i in range(len(FIELDS)):
        # Field names may be incorrect
        tmp = f'({ABVRV[i]}:{FIELDS[i]}'
        if fields[i] != '*':
            tmp += f' {{{FIELDS[i]}: \"{fields[i]}\"}}'
        tmp += ')'
        query_fields.append(tmp)

    query = '-[:CONTAINS]->'.join(query_fields)
    query += ' RETURNS s.State'
    for i in range(1, len(FIELDS)):
        query += f', {ABBRV[i]}.{FIELDS[i]}'

    query += ' LIMIT ' + LIMIT
    print(query)
    return query;


@app.route('/query', methods=['POST'])
def simple_query():
    db = get_db()

    f = request.form
    fields = [f['year'], f['state'], f['city'], f['street'], f['num']]
    results = db.run(get_query(fields))

    return results
