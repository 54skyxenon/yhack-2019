import React from "react";
import { Form, Button } from "react-bootstrap";
import DiffTable from './DiffTable';
import "bootstrap/dist/css/bootstrap.min.css";

export default class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year1: null,
      year2: null,
      diff: [],
      sim: []
    };
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if(!form.checkValidity()) {
      event.stopPropagation();
    } else {
      const {
        state, city, address
      } = this.props;

      const {
        year1, year2
      } = this.state;

      const body = {
        state,
        city,
        address,
        year1,
        year2
      };
      console.log(body);
      fetch('http://localhost:5000/diff', {
        method: 'POST',
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then((json) => {
          this.setState({
            sim: json.sim,
            diff: json.diff
          });
        })
        .catch((err) => {
          console.error('Something went wrong!');
        });
    }
  };

  badForm = () => {
    return (!this.state.year1 || !this.state.year2 || this.state.year2 === this.state.year1);
  }

  handleChange = (e) => {
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
            <Form.Label>Year 1</Form.Label>
            <Form.Control as="select" name="year1" onChange={this.handleChange}>
              <option>Select a year...</option>
              <option>2005</option>
              <option>2010</option>
              <option>2014</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="ControlSelect2">
            <Form.Label>Year 2</Form.Label>
            <Form.Control as="select" name="year2" onChange={this.handleChange}>
              <option>Select a year...</option>
              <option>2005</option>
              <option>2010</option>
              <option>2014</option>
            </Form.Control>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={this.badForm()}
            onClick={this.handleSubmit}
          >
            See the Difference!
          </Button>
          {
            this.state.diff &&
            this.state.sims &&
            <DiffTable diffs={this.state.diff} sims={this.state.sim} />
          }
        </Form>
      </div>
    );
  }
}
