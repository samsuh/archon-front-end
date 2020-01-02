//Registration is 'Signup' page; shows LoginForm

import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import * as actions from "../../actions";

//LoginForm shows a form for a user to add input
//Field acts as traditional HTML input tags like checkbox and textarea; https://stackoverflow.com/questions/39698285/how-to-upload-file-with-redux-form
import _ from "lodash";
// import { reduxForm, Field } from "redux-form";
import LoginField from "./LoginField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class Registration extends Component {
  //add renderFields function

  render() {
    // const { handleSubmit } = this.props;

    return (
      <div>
        Registration page showing
        <LoginForm
        // submitLogin={
        // values => console.log("values from registrationbutton: ", values)
        // values => actions.submitLogin(values) //this probably needs to be cleaned up and properly connected to LoginForm; where does the onSubmit handler go?
        // onLoginSubmit={() => this.setState({ hi: "from onLoginSubmit" })} //we are not using FormReview pattern, so update setState to match login flow. figure out where onLoginSubmit starts/is coming from
        // onSubmit={handleSubmit(this.onSubmit)}
        // }
        // onLoginSubmit={(props, values) =>
        //   console.log(
        //     "this is props from loginform onLoginSubmit: ",
        //     props,
        //     "values: ",
        //     values
        //   )
        // }
        />
      </div>
    );
  }
}

export default Registration;
