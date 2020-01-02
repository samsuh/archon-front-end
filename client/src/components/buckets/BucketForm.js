//BucketForm shows a form for a user to add input
//reduxForm is similar to the 'connect' function
//Field acts as traditional HTML input tags like checkbox and textarea; https://stackoverflow.com/questions/39698285/how-to-upload-file-with-redux-form
import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import BucketField from "./BucketField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

//handleSubmit calls our function whenever a user presses Submit button
class BucketForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={BucketField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onBucketSubmit)}>
          {this.renderFields()}
          <Link to="/dashboard" className="grey btn-flat white-text">
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

//values object has name:value of form content; if errors is empty assumes all valid; reduxform automatically matches errors to the fields rendered
function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || "");
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });
  return errors;
}

export default reduxForm({
  validate,
  form: "bucketForm",
  destroyOnUnmount: false,
})(BucketForm);
