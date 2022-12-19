import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "../reducer/index";

export const store = createStore(
  rootReducer,
  //composeWithDevTools the middleware pass as a parameter
  //Library to use instead of window constant
  composeWithDevTools(applyMiddleware(thunk))
);
