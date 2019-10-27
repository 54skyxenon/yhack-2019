import React from "react";
import "./App.css";
import Home from "./Home";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class App extends React.Component {
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
