export const enum ActionTypeEnums {
	LOGIN = "LOGIN",
	SET_USERINFO = "SET_USERINFO",
	SET_PERMISSION = "SET_PERMISSION"
}

export type TUserInfo = {
	id: string;
	username: string;
	mobile: string;
	email: string;
	enabled: boolean;
	name: string;
	sex: string;
	birthday: string;
	createdAt: string;
	updatedAt: string;
} | null;

export interface IPermission {
	permissionId: string;
	permissionName: string;
	permissionCode: string;
	description: string;
	type: "ROUTE" | "BUTTON";
	show: boolean /** 是否显示路由 */;
	parentPermissionId: string | null /**null为顶级 */;
	closable: boolean /** 是否可关闭tab */;
}
