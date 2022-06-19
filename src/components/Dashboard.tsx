import React, { Component } from "react";
import ResponsiveAppBar from "./UI/ResponsiveAppBar";
import OptionChainAnalysisList from "./DataList/OptionChainAnalysisList";

class Dashboard extends Component {
  render() {
    return (
      <>
        <ResponsiveAppBar />
        <OptionChainAnalysisList />
      </>
    );
  }
}

export default Dashboard;
