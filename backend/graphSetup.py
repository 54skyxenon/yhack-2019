from neo4j import GraphDatabase

class loadData(object):

    def __init__(self, uri, user, password):
        self._driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self._driver.close()

    @staticmethod
    def _load_data(tx, message):
        dataQuery = """
        LOAD CSV WITH HEADERS FROM 'https://github.com/EDRInc/RaD-EdrCore-Public/blob/master/Datasets/OccupantAddresses_CT_NewHaven_2005.csv' AS row 
WITH row.ID AS ID, row.Occupant AS Occupant, row.Address AS Address, row.City AS City, row.State AS State, row.ZipCode as ZipCode, row.FIPS as FIPS, row.Phone as Phone, row.Publisher as Publisher, row.Year as Year
        LOAD CSV WITH HEADERS FROM 'https://github.com/EDRInc/RaD-EdrCore-Public/blob/master/Datasets/OccupantAddresses_CT_NewHaven_2010.csv' AS row 
WITH row.ID AS ID, row.Occupant AS Occupant, row.Address AS Address, row.City AS City, row.State AS State, row.ZipCode as ZipCode, row.FIPS as FIPS, row.Phone as Phone, row.Publisher as Publisher, row.Year as Year
        LOAD CSV WITH HEADERS FROM 'https://github.com/EDRInc/RaD-EdrCore-Public/blob/master/Datasets/OccupantAddresses_CT_NewHaven_2014.csv' AS row 
WITH row.ID AS ID, row.Occupant AS Occupant, row.Address AS Address, row.City AS City, row.State AS State, row.ZipCode as ZipCode, row.FIPS as FIPS, row.Phone as Phone, row.Publisher as Publisher, row.Year as Year
    MATCH (s:State)
    MATCH (c:City)
    MATCH (z:ZipCode)
    # TODO: parse out street
    MATCH (street:Address)
    # TODO: parse out house number
    MATCH (hnum:Address)
    MATCH (occ:Occupant)
    # TODO: parse out unit number
    MATCH (unit:Address)
    MERGE (s)-[r:CONTAINS]->(c)
    MERGE (c)-[r:CONTAINS]->(z)
    MERGE (z)-[r:CONTAINS]->(street)
    MERGE (hnum)-[r:LIES_ALONG]->(street)
    MERGE (occ)-[r:RESIDES_AT]->(hnum)
    MERGE (occ)-[r:RESIDES_AT]->(unit)
    MERGE (hnum)-[HAS_UNIT]->(unit)
    """
        result = tx.run(dataQuery, message=message)

        return result

    @staticmethod
    def _match_(tx, address):
        # assumes address is in json format
        matchQuery = """
            MATCH (:State {})
