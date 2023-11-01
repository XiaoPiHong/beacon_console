import { IUserState } from "./reducers/user";

export interface IAction<T, K> {
	type: T;
	payload: K;
}

export interface IStoreState {
	user: IUserState;
}
