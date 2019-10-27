import React from "react";
import PropTypes from "prop-types";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "State",
    selector: "state",
    sortable: true
  },
  {
    name: "City",
    selector: "city",
    sortable: true
  },
  {
    name: "Address",
    selector: "address",
    sortable: true
  },
  {
    name: "Street Number",
    selector: "streetNumber",
    sortable: true
  }
];

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  arrToObject(value) {
    return {
      state: value[0],
      city: value[1],
      address: value[2],
      streetNumber: value[3]
    };
  }

  render() {
    const displayQuery = this.props.query.map(this.arrToObject);

    return (
      <DataTable
        title="Places"
        columns={columns}
        data={displayQuery}
        pagination={true}
        paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    );
  }
}

Pagination.propTypes = {
  query: PropTypes.arrayOf(PropTypes.array)
};
