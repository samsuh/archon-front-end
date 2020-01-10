import {
  FETCH_USER,
  SUBMIT_LOGIN,
  AUTH_USER,
  AUTH_ERROR,
} from "../actions/types";

const INITIAL_STATE = {
  authenticated: "",
  errorMessage: "",
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      // return action.payload || false;
      return { ...state, authenticated: action.payload } || false;
    //this might handle the login form submission and return something from passport. check. clean up later, using AUTH_USER instead.
    case SUBMIT_LOGIN:
      return state;
    //email/pw login
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

//should more auth reducers should go here? to handle different actions. actions get dispatched next store.dispatch({type:"ACTION_TYPE",payload:'something'})
