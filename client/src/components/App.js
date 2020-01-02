import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import BucketNew from "./buckets/BucketNew";

import Header from "./Header";
import Landing from "./Landing";

import Dashboard from "./Dashboard";
import Registration from "./login/Registration";
import Signup from "./login/Signup";
import Signin from "./login/Signin";
import Signout from "./login/Signout";

class App extends Component {
  componentDidMount() {
    //fetches user from Google OAuth
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/buckets/new" component={BucketNew} />
            <Route exact path="/auth/email" component={Registration} />
            {/* <Route exact path="/signup" component={Signup} /> */}
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signout" component={Signout} />
            {/* <Route exact path="/feature" component={Feature} /> */}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
