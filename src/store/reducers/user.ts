import { Reducer } from "redux";
import { IAction } from "../types";
import { ActionTypeEnums, IUserInfo } from "../constant/user";

export interface IUserState {
	userInfo: IUserInfo | null;
}

/** 初始化状态 */
const userState: IUserState = {
	userInfo: null
};

const userReducer: Reducer<IUserState, IAction<ActionTypeEnums, IUserInfo>> = (
	preState = userState,
	action: IAction<ActionTypeEnums, IUserInfo>
) => {
	const { type, payload } = action;
	switch (type) {
		case ActionTypeEnums.SET_USERINFO:
			return { ...preState, userInfo: payload };
		default:
			return preState;
	}
};

export default userReducer;
