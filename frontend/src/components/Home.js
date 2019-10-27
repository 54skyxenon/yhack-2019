import React from "react";
import { Form, Button } from "react-bootstrap";
import Pagination from './Pagination';
import "bootstrap/dist/css/bootstrap.min.css";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    }
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if(!form.checkValidity()) {
      event.stopPropagation();
    } else {
      const {
        state, city, address, year
      } = this.props;

      const body = {
        state,
        city,
        address,
        year
      };

      console.log(body);
      fetch('http://localhost:5000/query', {
        method: 'POST',
        body: JSON.stringify(body)
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
    const {
      handleChange
    } = this.props;

    return (
      <div className="App">
        <h1>Address query</h1>

        <Form style={{ fontSize: "1.2rem", marginTop: "20px" }} onSubmit={this.handleSubmit}>
          <Form.Group controlId="state">
            <Form.Label>Pick a state</Form.Label>
            <Form.Control as="select" name="state" onChange={handleChange}>
              <option value="*">All</option>
              <option value="MA">Massachusetts</option>
              <option value="CT">Connecticut</option>
            </Form.Control>
            <Form.Text className="text-muted">
              You can use * in the following fields to match all values.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>Enter city</Form.Label>
            <Form.Control type="text" name="city" placeholder="New York City" onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Enter address</Form.Label>
            <Form.Control type="text" name="address" placeholder="123 Sesame St"  onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="year">
            <Form.Label>Choose year</Form.Label>
            <Form.Control as="select" name="year" onChange={handleChange}>
              <option>2005</option>
              <option>2010</option>
              <option>2014</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Search
          </Button>

          <Pagination query={this.state.list} />
        </Form>
      </div>
    );
  }
}
