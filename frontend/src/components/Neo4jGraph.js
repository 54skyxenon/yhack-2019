import React from "react";
import PropTypes from "prop-types";

import results2005 from "../assets/2005svg.svg";
import results2010 from "../assets/2010svg.svg";
import results2014 from "../assets/2014svg.svg";

export default function Neo4jGraph(props) {
  const { width, height} = this.props;
  if (this.props.year === "2005") {
    return (
      <img
        src={results2005}
        alt="2005 graph"
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
      />
    );
  } else if (this.props.year === "2010") {
    return (
      <img
        src={results2010}
        alt="2010 graph"
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
      />
    );
  } else {
    return (
      <img
        src={results2014}
        alt="2014 graph"
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
      />
    );
  }
}

Neo4jGraph.defaultProps = {
  width: 600,
  height: 600,
  backgroundColor: "#d3d3d3"
};

Neo4jGraph.propTypes = {
  year: PropTypes.number.isRequired
};
