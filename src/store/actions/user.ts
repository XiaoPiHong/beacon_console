import { IAction } from "../types";
import { ActionTypeEnums } from "../constant/user";

export const setUserInfo: (userInfo: any) => IAction<ActionTypeEnums, any> = (userInfo: any) => ({
	type: ActionTypeEnums.SET_USERINFO,
	payload: userInfo
});
