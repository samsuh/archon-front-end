import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import BucketNew from "./buckets/BucketNew";

import Header from "./Header";
import Landing from "./Landing";

import Dashboard from "./Dashboard";
import Registration from "./login/Registration";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/buckets" component={Dashboard} />
            <Route path="/buckets/new" component={BucketNew} />
            <Route exact path="/auth/email" component={Registration} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
