import axios from "axios";
import {
  FETCH_USER,
  FETCH_BUCKETS,
  SUBMIT_LOGIN,
  AUTH_USER,
  AUTH_ERROR,
} from "./types";

export const fetchUser = () => async dispatch => {
  console.log("fetchUser invoked");
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
  // dispatch({ type: AUTH_USER, payload: res.data._id });
};

export const handleToken = token => async dispatch => {
  console.log("handleToken invoked", token);
  const res = await axios.post("/api/stripe", token);

  console.log(
    "handleToken invoked and token send to api/stripe with this token: ",
    token
  );
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitBucket = (values, history) => async dispatch => {
  console.log("submitBucket invoked");
  const res = await axios.post("/api/buckets", values);
  history.push("/dashboard");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchBuckets = () => async dispatch => {
  const res = await axios.get("/api/buckets");
  dispatch({ type: FETCH_BUCKETS, payload: res.data });
};

//potentially incorrect code
//bound action creator automatically dispatches anonymous function when called directly 'submitLogin(values)'
export const submitLogin = values => async dispatch => {
  // console.log("submitLogin from index.js printing values: ", values);
  const res = await axios.post("/auth/email/signup", values);
  dispatch({ type: SUBMIT_LOGIN, payload: values });
};

//example from advanced email/pw login
// formProps is coming from the way the <form> is built. check how this changes when using reduxForm
//reduxThunk allows us to return either an action object {type:'SOMETHING', payload: 'optional something'} or a fx automatically called with the dispatch fx.
//this lets us dispatch many actions from a single action creator. can also do an async request, wait for promise to resolve, then dispatch again.
export const signup = (formProps, callback) => async dispatch => {
  //logic around action creator (making a request, trying to sign up with email/pw, then dispatching action) all occur here.
  console.log("signup fx from actions", formProps);
  try {
    const response = await axios.post(
      "http://localhost:5000/auth/email/signup",
      formProps
    );

    //call dispatch and pass the actions we want to pass to middlwares and reducers
    dispatch({ type: AUTH_USER, payload: response.data.token });
    //add localStorage to persist JWT. works, but /dashboard is still kicking user to '/'. check and clean up.
    localStorage.setItem("jwt", response.data.token);
    callback();
    console.log(
      "callback successfully called from signup function from actions/index.js"
    );
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
  //redir to feature page after signing in success
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      "http://localhost:5000/auth/email/signin",
      formProps
    );
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("jwt", response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid User Credentials" });
  }
};
export const signout = () => {
  localStorage.removeItem("jwt");

  return {
    type: AUTH_USER,
    payload: "",
  };
};
