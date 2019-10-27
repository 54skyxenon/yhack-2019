import React from "react";
import "./App.css";
import Home from "./Home";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class App extends React.Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);
    this.state = {};
  }

=======
>>>>>>> b77c34ce936078c9df4a737177811518109661cb
  render() {
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
