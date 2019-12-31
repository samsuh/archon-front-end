//LoginForm shows a form for a user to add input
//reduxForm is similar to the 'connect' function

import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import LoginField from "./LoginField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";
import * as actions from "../../actions";

//handleSubmit calls our function whenever a user presses Submit button
class LoginForm extends Component {
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
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onLoginSubmit)}>
          {this.renderFields()}
          <Link to="/auth/email" className="grey btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next <i className="material-icons right">done</i>
          </button>
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

export default reduxForm({ form: "loginForm", actions })(LoginForm);