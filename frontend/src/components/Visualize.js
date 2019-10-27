import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Neo4jPicture from './Neo4jPicture';


export default class Visualize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null
    };
  }

  formInvalid = () => {
    return !this.state.selectedYear;
  };

  handleChange = e => {
    if (e.target.value !== "Select a year...") {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      this.setState({ [e.target.name]: null });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Envision the Data</h1>

        <Form style={{ fontSize: "1.2rem" }}>
          <Form.Group controlId="ControlSelect1">
            <Form.Label>Pick a Year:</Form.Label>
            <Form.Control
              as="select"
              name="selectedYear"
              onChange={this.handleChange}
            >
              <option>Select a year...</option>
              <option>2005</option>
              <option>2010</option>
              <option>2014</option>
            </Form.Control>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={this.formInvalid()}
            onClick={this.handleSubmit}
          >
            Prepare to be amazed!
          </Button>


        </Form>
      </div>
    );
  }
}
