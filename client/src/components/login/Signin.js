//this is from adv course, but i am using Registration.js to serve as the signup form.
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import * as actions from "../../actions";

class Signin extends Component {
  onSubmit = formProps => {
    console.log("from Signup Component onSubmit", formProps);
    this.props.signin(formProps, () => {
        this.props.history.push('/dashboard')
    });
  };

  render() {
    //before adding callback to form tag, destructure handleSubmit from props object provided by reduxform.
    const { handleSubmit } = this.props;

    return (
      //make sure anytime user submits form, we call onSubmit. using reduxForm, we get a fx on props object called handleSubmit. we have to call this to take email/pw out of form and provide it to onSubmit callback.
      //on <form> tag itself, we can add onSubmit to call handleSubmit. pass handleSubmit the callback that we want to be executed when the user submits the form, which is the onSubmit method we just created.
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field name="email" type="text" component="input" />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field name="password" type="password" component="input" />
        </fieldset>
        <button>Sign In!</button>
      </form>
    );
  }
}

export default compose(
  connect(null, actions),
  reduxForm({ form: "signin", actions })
)(Signin);
