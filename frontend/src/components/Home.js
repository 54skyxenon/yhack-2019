import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <h1>Sample Text</h1>
        <Form style={{ fontSize: "1.2rem" }}>
          <Form.Group controlId="ControlSelect1">
            <Form.Label>Pick a state</Form.Label>
            <Form.Control as="select">
              <option>None selected</option>
              <option>Massachusetts</option>
              <option>Connecticut</option>
            </Form.Control>
            <Form.Text className="text-muted">
              You need to pick a state before you pick a city.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="ControlSelect2">
            <Form.Label>Pick a city</Form.Label>
            <Form.Control as="select" disabled={true}>
              <option>None selected</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Enter an address</Form.Label>
            <Form.Control type="text" placeholder="555 Example St." />
          </Form.Group>
          <Form.Group controlId="ControlSelect3">
            <Form.Label>Year</Form.Label>
            <Form.Control as="select">
              <option>2005</option>
              <option>2010</option>
              <option>2014</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Move to Step 2
          </Button>
        </Form>
      </div>
    );
  }
}
