//Registration page shows LoginForm

import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import * as actions from "../../actions";

class Registration extends Component {
  render() {
    return (
      <div>
        Registration page showing
        <LoginForm
          onSubmitLogin={values =>
            console.log("values from registrationbutton: ", values)
          }
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
