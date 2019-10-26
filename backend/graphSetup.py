from neo4j import GraphDatabase
import os
import glob
import pandas as pd

class loadData(object):

    def __init__(self, uri, user, password):
        self._driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self._driver.close()

    @staticmethod
    def _load_data(tx, message):

        #os.chdir("C:/Users/Stephanie/.Neo4jDesktop/neo4jDatabases/database-a75e1057-825c-4b85-8329-f1f6407d04cf/installation-3.5.6/import")
        #extension = 'csv'
        #all_files = [i for i in glob.glob('*.{}'.format(extension))]
        # merge all data to one csv
        #all_data = pd.concat([pd.read_csv(f] for f in all_files])
        #all_data.to_csv("combined_csv.csv", index=False, encoding='utf-8-sig')

        dataQuery = """
        LOAD CSV WITH HEADERS FROM "file:///OccupantAddresses.csv" AS row 
WITH row.ID AS ID, row.Occupant AS Occupant, row.Address AS Address, row.City AS City, row.State AS State, row.ZipCode as ZipCode, row.FIPS as FIPS, row.Phone as Phone, row.Publisher as Publisher, row.Year as Year
        MERGE (y:Year {year: Year})
        MERGE (s:State {state: State})
        MERGE (c:City {city: City})
        MERGE (num:HouseNumber {number: split(Address, "|")[0]})
        MERGE (st:Street {street: replace(Address, split(Address, "|")[0]+"|", "")})
        MERGE (y)-[r0:CONTAINS]->(s)
        MERGE (s)-[r1:CONTAINS]->(c)
        MERGE (c)-[r2:CONTAINS]->(st)
        MERGE (st)-[r3:CONTAINS]->(num)
        """
        result = tx.run(dataQuery, message=message)

        return result

def main():
    __init__('bolt://localhost',"neo4j","yhack19")
    _load_data()
    close()
