import { IActionFn } from "../types";
import { ActionTypeEnums, TUserInfo, IPermission } from "../constant/user";

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
		permissionCode: "/role/:id/:name",
		description: "string",
		type: "ROUTE",
		parentPermissionId: "2"
	},
	// {
	// 	permissionId: "2-1-1",
	// 	permissionName: "查看",
	// 	permissionCode: "view",
	// 	description: "string",
	// 	type: "BUTTON",
	// 	parentPermissionId: "2-1"
	// },
	{
		permissionId: "2-1-2",
		permissionName: "编辑",
		permissionCode: "edit",
		description: "string",
		type: "BUTTON",
		parentPermissionId: "2-1"
	}
];

const test = () => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, 1000);
	});
};

/** 提供给页面使用start */
export type TUserActionFn = IActionFn<TUserInfo, ActionTypeEnums>;

export const setUserInfo: TUserActionFn = userInfo => ({
	type: ActionTypeEnums.SET_USERINFO,
	payload: userInfo
});

export const setPermission: IActionFn<IPermission[], ActionTypeEnums> = permission => ({
	type: ActionTypeEnums.SET_PERMISSION,
	payload: permission
});
/** 提供给页面使用end */

/** 登录 */
export const login = () => {
	return new Promise(resolve => {
		test().then(async () => {
			localStorage.setItem("token", "xxx");
			const u = await test();
			const p = await test();
			console.log(u, p);
			resolve({ type: ActionTypeEnums.LOGIN, payload: { userInfo: { name: "xxx", password: "xx" }, permission } });
		});
	});
};

/** 退出登录 */
export const loginOut = async () => {
	await test();
	localStorage.removeItem("token");
	return { type: ActionTypeEnums.SET_USERINFO, payload: null };
};

/** 获取用户信息 */
export const getUserInfo = async () => {
	const userInfo = await test();
	console.log(userInfo);
	return { type: ActionTypeEnums.SET_USERINFO, payload: { name: "xxx", password: "xxx" } };
};

/** 获取权限 */
export const getPermission = async () => {
	const p = await test();
	console.log(p);
	return { type: ActionTypeEnums.SET_PERMISSION, payload: permission };
};
