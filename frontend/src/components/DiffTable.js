import React from "react";
import DataTable from "react-data-table-component";
import PropTypes from "prop-types";

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
    name: "Street",
    selector: "street",
    sortable: true
  },
  {
    name: "House Number",
    selector: "houseNumber",
    sortable: true
  }
];

export default class DiffTable extends React.Component {
  constructor(props) {
    super(props);
  }

  arrToObject(value) {
    return {
      state: value[0],
      city: value[1],
      street: value[2],
      houseNumber: value[3]
    };
  }

  render() {
    const processedSims = this.props.sims.map(this.arrToObject);
    const processedDiffs = this.props.diffs.map(this.arrToObject);

    return (
      <div>
        <DataTable
          columns={columns}
          data={processedSims}
          pagination={true}
          paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
        <DataTable
          columns={columns}
          data={processedDiffs}
          pagination={true}
          paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    );
  }
}

DiffTable.propTypes = {
  sims: PropTypes.array.isRequired,
  diffs: PropTypes.array.isRequired
};
