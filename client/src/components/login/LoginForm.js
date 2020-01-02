//LoginForm shows a form for a user to add input
//reduxForm is similar to the 'connect' function

import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import LoginField from "./LoginField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";
import * as actions from "../../actions";

//handleSubmit calls our function whenever a user presses Submit button
class LoginForm extends Component {
  onSubmit = formProps => {
    // console.log(formProps);
    //call the 'signup' action creator. once successful, redirect user.
    this.props.signup(formProps, () => {
      this.props.history.push("/buckets");
      console.log("callback hit from LoginForm signup callback");
    });
  };
  renderFields() {
    return _.map(formFields, ({ label, name, type }) => {
      console.log("renderFields invoked");
      return (
        <Field
          component={LoginField}
          type={type}
          label={label}
          name={name}
          key={name}
        />
      );
    });
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      //adv react module 128.
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          {this.renderFields()}
          <Link to="/auth/email" className="grey btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Register <i className="material-icons right">done</i>
          </button>
          <div className="red-text right-align">{this.props.errorMessage}</div>
        </form>
      </div>
    );
  }
}

// //values object has name:value of form content; if errors is empty assumes all valid; reduxform automatically matches errors to the fields rendered
// function validate(values) {
//   const errors = {};
//   errors.recipients = validateEmails(values.recipients || "");
//   _.each(formFields, ({ name }) => {
//     if (!values[name]) {
//       errors[name] = "You must provide a value";
//     }
//   });
//   return errors;
// }

// export default reduxForm({
//   validate,
//   form: "loginForm",
//   destroyOnUnmount: false,
// })(LoginForm);
function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "loginForm", actions }),
  withRouter
)(LoginForm);
