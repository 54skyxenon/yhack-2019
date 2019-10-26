import React from "react";
import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Background from "../assets/graph-bg.png";

class App extends React.Component {
  state = {
    uploadPassed: false,
    step1ButtonClicked: false,
    step1passed: false,
    step2ButtonClicked: false,
    step2passed: false,
    step3ButtonClicked: false,
    step3passed: false,
    step4ButtonClicked: false
  };

  setStep1Passed() {
    this.setState({
      step1passed: true
    });
  }

  setStep2Passed() {
    this.setState({
      step2passed: true
    });
  }

  setStep3Passed() {
    this.setState({
      step3passed: true
    });
  }

  render() {
    return (
      <Router>
        <div
          style={{
            padding: "5%",
            backgroundImage: `url(${Background})`
          }}
        >
          <nav>
            <Link to="/">Func 1</Link>
            <br/>
            <Link to="/about">Func 2</Link>
            {this.state.step1passed && <Link to="/about">Step 2 &#8594;</Link>}
            {this.state.step2passed && <Link to="/about">Step 3 &#8594;</Link>}
            {this.state.step3passed && <Link to="/about">Step 4</Link>}
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function About() {
  return <h2>About</h2>;
}

export default App;
