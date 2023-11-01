import { combineReducers } from "redux";
import { IStoreState } from "../types";
import user from "./user";

const reducers = combineReducers<IStoreState>({
	user
});

export default reducers;
