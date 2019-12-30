import { FETCH_USER, SUBMIT_LOGIN } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
      break;
    //this might handle the login form submission and return something from passport. check.
    case SUBMIT_LOGIN:
      return state;
    default:
      return state;
  }
}

//should more auth reducers should go here? to handle different actions. actions get dispatched next store.dispatch({type:"ACTION_TYPE",payload:'something'})
