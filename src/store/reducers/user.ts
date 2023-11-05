import { Reducer } from "redux";
import { IAction } from "../types";
import { ActionTypeEnums, TUserInfo, IPermission } from "../constant/user";

export interface IUserState {
	userInfo: TUserInfo;
	permission: IPermission[];
}

/** 初始化状态 */
const userState: IUserState = {
	userInfo: null,
	permission: []
};

const userReducer: Reducer<IUserState, IAction<ActionTypeEnums, any>> = (
	preState = userState,
	action: IAction<ActionTypeEnums, any>
) => {
	const { type, payload } = action;
	switch (type) {
		case ActionTypeEnums.SET_USERINFO:
			return { ...preState, userInfo: payload };
		case ActionTypeEnums.SET_PERMISSION:
			return { ...preState, permission: payload };
		default:
			return preState;
	}
};

export default userReducer;
