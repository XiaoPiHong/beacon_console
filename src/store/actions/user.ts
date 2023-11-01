import { IActionFn } from "../types";
import { ActionTypeEnums, IUserInfo } from "../constant/user";

export const setUserInfo: IActionFn<IUserInfo, ActionTypeEnums> = userInfo => ({
	type: ActionTypeEnums.SET_USERINFO,
	payload: userInfo
});
