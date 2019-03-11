import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Main } from "./main";
import { Pop } from "./pop";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class App extends Component {

  render() {
    return (
      <Router basename="/#/">
      <div id="main_wrapper">
        <Route exact path="/" component={Main} />
        <Route path="/pop" component={Pop} />
      </div>
    </Router>   
    );
  }
}

export default App;
