from neo4j import GraphDatabase

class loadData(object):

    def __init__(self, uri, user, password):
        self._driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self._driver.close()

    @staticmethod
    def _load_data(tx, message):
        dataQuery = "LOAD CSV WITH HEADERS FROM 'https://github.com/EDRInc/RaD-EdrCore-Public/blob/master/Datasets/OccupantAddresses_CT_NewHaven_2005.csv'"
        result = tx.run("", message=message)

        return result
