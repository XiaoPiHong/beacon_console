import { IUserState } from "./reducers/user";
export interface IAction<T, K> {
	type: T;
	payload: K;
}

export interface IActionFn<T, K> {
	(value: T): IAction<K, T>;
}

/**
 * 总状态类型：
 * 新增的模块需在这里添加模块类型...
 */
export interface IStoreState {
	user: IUserState;
}
