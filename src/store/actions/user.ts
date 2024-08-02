import { IActionFn } from "../types";
import { ActionTypeEnums, TUserInfo, IPermission } from "../constant/user";
import * as utilsStorage from "@/utils/storage";
import * as apisAuth from "@/apis/auth";

const permission: IPermission[] = [
	{
		permissionId: "1",
		permissionName: "首页",
		permissionCode: "/home",
		description: "string",
		type: "ROUTE",
		show: true,
		parentPermissionId: null,
		closable: false
	},
	{
		permissionId: "1-1",
		permissionName: "查看",
		permissionCode: "view",
		description: "string",
		type: "BUTTON",
		show: true,
		parentPermissionId: "1",
		closable: true
	},
	{
		permissionId: "2",
		permissionName: "系统",
		permissionCode: "/system",
		description: "string",
		type: "ROUTE",
		show: true,
		parentPermissionId: null,
		closable: true
	},
	{
		permissionId: "2-1",
		permissionName: "角色管理",
		permissionCode: "/role/:id/:name",
		description: "string",
		type: "ROUTE",
		show: false,
		parentPermissionId: "2",
		closable: true
	},
	{
		permissionId: "2-2",
		permissionName: "组织架构",
		permissionCode: "/organizationalStructure",
		description: "string",
		type: "ROUTE",
		show: true,
		parentPermissionId: "2",
		closable: true
	},
	{
		permissionId: "2-2-1",
		permissionName: "部门管理",
		permissionCode: "/department",
		description: "string",
		type: "ROUTE",
		show: true,
		parentPermissionId: "2-2",
		closable: true
	},
	{
		permissionId: "2-2-1-1",
		permissionName: "查看",
		permissionCode: "view",
		description: "string",
		type: "BUTTON",
		show: true,
		parentPermissionId: "2-2-1",
		closable: true
	},
	{
		permissionId: "2-1-1",
		permissionName: "查看",
		permissionCode: "view",
		description: "string",
		type: "BUTTON",
		show: true,
		parentPermissionId: "2-1",
		closable: true
	},
	{
		permissionId: "2-1-2",
		permissionName: "编辑",
		permissionCode: "edit",
		description: "string",
		type: "BUTTON",
		show: true,
		parentPermissionId: "2-1",
		closable: true
	},
	{
		permissionId: "3",
		permissionName: "用户",
		permissionCode: "/user",
		description: "string",
		type: "ROUTE",
		show: true,
		parentPermissionId: null,
		closable: true
	},
	{
		permissionId: "3-1",
		permissionName: "用户管理",
		permissionCode: "/userManage",
		description: "string",
		type: "ROUTE",
		show: true,
		parentPermissionId: "3",
		closable: true
	}
];

const testApi = (): Promise<any> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, 300);
	});
};

const testLoginApi = (params?: any): Promise<any> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				data: {
					user: {
						id: "6",
						username: "xph-admin",
						mobile: "18028592715",
						email: "xph@qq.com",
						enabled: true,
						name: "超级管理员",
						sex: "MALE",
						birthday: "2020-02-02 00:00:00",
						createdAt: "2024-07-27 17:27:24",
						updatedAt: "2024-07-27 17:27:24"
					},
					accessToken: "xxxx",
					refreshToken: "xxxx"
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
					user: {
						id: "6",
						username: "xph-admin",
						mobile: "18028592715",
						email: "xph@qq.com",
						enabled: true,
						name: "超级管理员",
						sex: "MALE",
						birthday: "2020-02-02 00:00:00",
						createdAt: "2024-07-27 17:27:24",
						updatedAt: "2024-07-27 17:27:24"
					}
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

/** 用户名登录 */
export const loginByUsername = (params?: any) => {
	return apisAuth.postSignInByUsername(params).then(({ data }) => {
		// return testLoginApi(params).then(async ({ data }) => {
		utilsStorage.local.accessToken.set(data.accessToken);
		utilsStorage.local.refreshToken.set(data.refreshToken);
		utilsStorage.local.user.set(data.user);
		return { type: ActionTypeEnums.LOGIN, payload: { userInfo: data.user, permission } };
	});
};

/** 退出登录 */
export const loginOut = async () => {
	await testApi();
	utilsStorage.local.accessToken.remove();
	utilsStorage.local.refreshToken.remove();
	utilsStorage.local.user.remove();
	return { type: ActionTypeEnums.SET_USERINFO, payload: null };
};

/** 获取用户信息 */
export const getUserInfo = async () => {
	const { data } = await apisAuth.getUserInfo();
	return { type: ActionTypeEnums.SET_USERINFO, payload: data };
};

/** 获取权限 */
export const getPermission = async () => {
	const p = await testApi();
	console.log(p);
	return { type: ActionTypeEnums.SET_PERMISSION, payload: permission };
};
