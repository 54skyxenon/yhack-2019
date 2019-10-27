import React from "react";
import "./App.css";
import Home from "./Home";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

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
      <div
        style={{
          padding: "5%",
        }}
      >
        <Tabs>
          <TabList style={{margin: 0}}>
            <Tab>Address Matching</Tab>
            <Tab>Compare</Tab>
          </TabList>
          <div className="tabContent">
          <TabPanel>
            <Home />
          </TabPanel>
          <TabPanel>
            <About />
          </TabPanel>
          </div>
        </Tabs>
      </div>
    );
  }
}

function About() {
  return <h2>About</h2>;
}

export default App;
