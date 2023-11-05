import { Dispatch } from "react";
import { IAction, IActionFn } from "../types";
import { ActionTypeEnums, TUserInfo, IPermission } from "../constant/user";

/** 提供给页面使用start */
export type TUserActionFn = IActionFn<TUserInfo, ActionTypeEnums>;

export const setUserInfo: TUserActionFn = userInfo => ({
	type: ActionTypeEnums.SET_USERINFO,
	payload: userInfo
});
/** 提供给页面使用end */

/** 登录 */
export const login = () => {
	return (dispatch: Dispatch<IAction<ActionTypeEnums, TUserInfo> | Function>) => {
		setTimeout(() => {
			localStorage.setItem("token", "xxx");
			dispatch({ type: ActionTypeEnums.SET_USERINFO, payload: { name: "xxx", password: "xxx" } });
			dispatch(getPermission());
		}, 1000);
	};
};

/** 退出登录 */
export const loginOut = () => {
	return (dispatch: Dispatch<IAction<ActionTypeEnums, TUserInfo>>) => {
		setTimeout(() => {
			localStorage.removeItem("token");
			dispatch({ type: ActionTypeEnums.SET_USERINFO, payload: null });
		}, 1000);
	};
};

/** 获取权限 */
export const getPermission = () => {
	return (dispatch: Dispatch<IAction<ActionTypeEnums, IPermission[]>>) => {
		// permissionId: string;
		// permissionName: string;
		// permissionCode: string;
		// description: string;
		// type: "ROUTE" | "BUTTON";
		// parentPermissionId: string;
		/** 模拟数据 */
		const permission: IPermission[] = [
			{
				permissionId: "1",
				permissionName: "首页",
				permissionCode: "/home",
				description: "string",
				type: "ROUTE",
				parentPermissionId: null
			},
			{
				permissionId: "1-1",
				permissionName: "查看",
				permissionCode: "view",
				description: "string",
				type: "BUTTON",
				parentPermissionId: "1"
			},
			{
				permissionId: "2",
				permissionName: "系统管理",
				permissionCode: "/system",
				description: "string",
				type: "ROUTE",
				parentPermissionId: null
			},
			{
				permissionId: "2-1",
				permissionName: "角色管理",
				permissionCode: "/role",
				description: "string",
				type: "ROUTE",
				parentPermissionId: "2"
			},
			{
				permissionId: "2-1-1",
				permissionName: "查看",
				permissionCode: "view",
				description: "string",
				type: "BUTTON",
				parentPermissionId: "2-1"
			},
			{
				permissionId: "2-1-2",
				permissionName: "编辑",
				permissionCode: "edit",
				description: "string",
				type: "BUTTON",
				parentPermissionId: "2-1"
			}
		];
		setTimeout(() => {
			dispatch({ type: ActionTypeEnums.SET_PERMISSION, payload: permission });
		}, 1000);
	};
};
