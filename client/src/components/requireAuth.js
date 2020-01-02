//exports a function, a HOC that wraps the component being passed in, creates ComposedComponent with this functionality.
//ComposedComponent class will try to render the passedin component, but also executes componentDidMount and componentDidUpdate
//Has info it needs to decide whether user should see the page or navigate away.
import React, { Component, compose } from "react";
import { connect } from "react-redux";

export default ChildComponent => {
  class ComposedComponent extends Component {
    // Our component just got rendered. check to see if user is logged in
    componentDidMount() {
      this.shouldNavigateAway();
    }
    // Our component just got updated. check if logged in again. if user logs out, that would update.
    componentDidUpdate() {
      this.shouldNavigateAway();
    }
    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push("/");
      }
    }
    render() {
      //action creators are being passed into ChildComponent, but also the history prop from <Route> in App.js
      return <ChildComponent {...this.props} />;
    }
  }
  //the component needs to know whether the user is authenticated.
  function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
  }
  return connect(mapStateToProps)(ComposedComponent);
};
