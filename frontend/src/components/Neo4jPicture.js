import React from "react";

export default class Neo4jPicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const config = {
      //container_id: "viz",
      server_url: "bolt://34.95.39.76:7687",
      server_user: "neo4j",
      server_password: "yhack19",
      labels: {
        Troll: {
          caption: "user_key",
          size: "pagerank",
          community: "community"
        }
      },
      relationships: {
        RETWEETS: {
          caption: false,
          thickness: "count"
        }
      },
      initial_cypher: "MATCH p=(:Troll)-[:RETWEETS]->(:Troll) RETURN p"
    };
    return (<p>Hello world</p>);
    //const viz = new NeoVis.default(config);
    //viz.render();
  }
}
