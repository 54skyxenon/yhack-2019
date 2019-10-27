import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        state: '*',
        city: '',
        address: '',
        year: 2005,
        page: 0,
      },
      list: [],
    }
  }

  handleChange = (event) => {
    var form = JSON.parse(JSON.stringify(this.state.form));
    form[event.target.name] = event.target.value.toUpperCase();
    this.setState({ form: form });
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if(!form.checkValidity()) {
      event.stopPropagation();
    } else {
      fetch('http://localhost:5000/query', {
        method: 'POST',
        body: JSON.stringify(this.state.form)
      })
        .then(res => res.json())
        .then((json) => {
          this.setState({
            list: json,
          });
        })
        .catch((err) => {
          console.error('Something went wrong!');
        });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Address query</h1>

        <Form style={{ fontSize: "1.2rem" }} onSubmit={this.handleSubmit}>
          <Form.Group controlId="state">
            <Form.Label>Pick a state</Form.Label>
            <Form.Control as="select" name="state" onChange={this.handleChange}>
              <option value="*">All</option>
              <option value="MA">Massachusetts</option>
              <option value="CT">Connecticut</option>
            </Form.Control>
            <Form.Text className="text-muted">
              You need to pick a state before you pick a city.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>Enter city</Form.Label>
            <Form.Control type="text" name="city" placeholder="New York City" onChange={this.handleChange} required />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Enter address</Form.Label>
            <Form.Control type="text" name="address" placeholder="123 Sesame St"  onChange={this.handleChange} required />
          </Form.Group>
          <Form.Group controlId="year">
            <Form.Label>Choose year</Form.Label>
            <Form.Control as="select" name="year" onChange={this.handleChange}>
              <option>2005</option>
              <option>2010</option>
              <option>2014</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Query!
          </Button>
        </Form>
      </div>
    );
  }
}
