import { IActionFn } from "../types";
import { ActionTypeEnums, TUserInfo, IPermission } from "../constant/user";
import * as utilsStorage from "@/utils/storage";

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
	{
		permissionId: "2-2",
		permissionName: "组织架构",
		permissionCode: "/organizationalStructure",
		description: "string",
		type: "ROUTE",
		parentPermissionId: "2"
	},
	{
		permissionId: "2-2-1",
		permissionName: "部门管理",
		permissionCode: "/department",
		description: "string",
		type: "ROUTE",
		parentPermissionId: "2-2"
	},
	{
		permissionId: "2-2-1-1",
		permissionName: "查看",
		permissionCode: "view",
		description: "string",
		type: "BUTTON",
		parentPermissionId: "2-2-1"
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

const testApi = (): Promise<any> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, 300);
	});
};

const testLoginApi = (): Promise<any> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				data: {
					user: { name: "xxx", password: "xxx" },
					token: "token"
				}
			});
		}, 300);
	});
};

const testGetUserApi = (): Promise<any> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				data: {
					user: { name: "xxx", password: "xxx" }
				}
			});
		}, 300);
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
		testLoginApi().then(async () => {
			const { data } = await testLoginApi();
			console.log(data);
			utilsStorage.local.token.set(data.token);
			utilsStorage.local.user.set(data.user);
			resolve({ type: ActionTypeEnums.LOGIN, payload: { userInfo: data.user, permission } });
		});
	});
};

/** 退出登录 */
export const loginOut = async () => {
	await testApi();
	utilsStorage.local.token.remove();
	utilsStorage.local.user.remove();
	return { type: ActionTypeEnums.SET_USERINFO, payload: null };
};

/** 获取用户信息 */
export const getUserInfo = async () => {
	const { data } = await testGetUserApi();
	console.log(data);
	utilsStorage.local.user.set(data.user);
	return { type: ActionTypeEnums.SET_USERINFO, payload: data.user };
};

/** 获取权限 */
export const getPermission = async () => {
	const p = await testApi();
	console.log(p);
	return { type: ActionTypeEnums.SET_PERMISSION, payload: permission };
};
