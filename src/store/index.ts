import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//暴露store
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
