import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import M from "materialize-css";

import * as actions from "../actions";
import BucketNew from "./buckets/BucketNew";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import Registration from "./login/Registration";
import Signup from "./login/Signup";
import Signin from "./login/Signin";
import Signout from "./login/Signout";
import Footer from "./Footer";

import "../styles/main.css";

class App extends Component {
  componentDidMount() {
    M.AutoInit();
    //fetches user from Google OAuth
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div id="app-body">
          <header>
            <Header />
          </header>
          <main>
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/buckets/new" component={BucketNew} />
            <Route exact path="/auth/email" component={Registration} />
            {/* <Route exact path="/signup" component={Signup} /> */}
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signout" component={Signout} />
            {/* <Route exact path="/feature" component={Feature} /> */}
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
