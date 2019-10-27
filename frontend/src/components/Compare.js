import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year1: null,
      year2: null
    };
  }

  formInvalid = () => {
    return !this.state.year1 || !this.state.year2;
  };

  getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  handleSubmit = () => {};

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
        <h1>How have times changed?</h1>

        <Form style={{ fontSize: "1.2rem" }}>
          <Form.Group controlId="ControlSelect1">
            <Form.Label>Year #1</Form.Label>
            <Form.Control as="select" name="year1" onChange={this.handleChange}>
              <option>Select a year...</option>
              <option>2005</option>
              <option>2010</option>
              <option>2014</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="ControlSelect2">
            <Form.Label>Year #2</Form.Label>
            <Form.Control as="select" name="year2" onChange={this.handleChange}>
              <option>Select a year...</option>
              <option>2005</option>
              <option>2010</option>
              <option>2014</option>
            </Form.Control>
          </Form.Group>

          <Button
            variant="primary"
            disabled={this.formInvalid()}
            type="submit"
            onClick={this.handleSubmit}
          >
            See the Difference!
          </Button>
        </Form>
      </div>
    );
  }
}
