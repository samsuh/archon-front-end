import axios from "axios";
import { FETCH_USER, FETCH_BUCKETS, SUBMIT_LOGIN } from "./types";

export const fetchUser = () => async dispatch => {
  console.log("fetchUser invoked");
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
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
  history.push("/buckets");
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
  const res = await axios.post("/auth/email/callback", values);
  dispatch({ type: SUBMIT_LOGIN, payload: values });
};
