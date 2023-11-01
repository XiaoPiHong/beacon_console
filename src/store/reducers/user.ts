import { Reducer } from "redux";
import { IAction } from "../types";
import { ActionTypeEnums } from "../constant/user";

export interface IUserState {
	userInfo: any /** 用户信息类型后期需改 */;
}

/** 初始化状态 */
const userState: IUserState = {
	userInfo: null
};

const userReducer: Reducer<IUserState, IAction<ActionTypeEnums, any>> = (
	preState = userState,
	action: IAction<ActionTypeEnums, any>
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
