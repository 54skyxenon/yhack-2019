import React from "react";
import "./App.css";
import Home from "./Home";
import Compare from "./Compare";
import Visualize from "./Visualize";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      state: '*',
      city: '',
      address: '',
      year: 2005,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name] : e.target.value.toUpperCase() });
  }

  render() {
    const {
      state,
      city,
      address,
      year,
    } = this.state;

    return (
      <div
        style={{
          padding: "5%"
        }}
      >
        <div id="navbar">
          <img
            src={require("../assets/logo.jpg")}
            className="App-logo"
            width={480}
            height={270}
            alt="Graph.srch logo"
          />
        </div>
        <Tabs id="main-tab-container">
          <TabList style={{ margin: 0 }}>
            <Tab>Address Matching</Tab>
            <Tab>Compare</Tab>
            <Tab>Visualize</Tab>
          </TabList>

          <div className="tabContent">
            <TabPanel>
              <Home
                state={state}
                city={city}
                address={address}
                year={year}
                handleChange={this.handleChange}
              />
            </TabPanel>

            <TabPanel>
              <Compare
                state={state}
                city={city}
                address={address}
              />
            </TabPanel>

            <TabPanel>
              <Visualize />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default App;
