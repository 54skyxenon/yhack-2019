from neo4j import GraphDatabase

uri = 'bolt://34.95.39.76:7687'
driver = GraphDatabase.driver(uri, auth=("neo4j","yhack19"))

def _load_data(tx, message):



    dataQuery = """
    LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/54skyxenon/yhack-2019/master/datasets/OccupantAddresses.csv' AS row
    WITH row.ID AS ID, row.Occupant AS Occupant, row.Address AS Address, row.City AS City, row.State AS State, row.ZipCode as ZipCode, row.FIPS as FIPS, row.Phone as Phone, row.Publisher as Publisher, row.Year as Year

    MERGE (s:State {state: State})
    MERGE (y:Year {year: Year})
    MERGE (c:City {city: City})
    MERGE (num:HouseNumber {number: split(Address, "|")[0]})
    MERGE (st:Street {street: replace(Address, split(Address, "|")[0]+"|", "")})
    MERGE (y)-[r0:CONTAINS]->(s)
    MERGE (s)-[r1:CONTAINS]->(c)
    MERGE (c)-[r2:CONTAINS]->(st)
    MERGE (st)-[r3:CONTAINS]->(num)
    MERGE (y)-[r4:CONTAINS]->(c)
    MERGE (y)-[r5:CONTAINS]->(st)
    MERGE (y)-[r6:CONTAINS]->(num)
    """
    result = tx.run(dataQuery, message=message)

    return result

with driver.session() as session:
    session.write_transaction(_load_data, "results")
    driver.close()
