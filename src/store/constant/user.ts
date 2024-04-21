export const enum ActionTypeEnums {
	LOGIN = "LOGIN",
	SET_USERINFO = "SET_USERINFO",
	SET_PERMISSION = "SET_PERMISSION"
}

export type TUserInfo = {
	name: string;
	password: string;
} | null;

export interface IPermission {
	permissionId: string;
	permissionName: string;
	permissionCode: string;
	description: string;
	type: "ROUTE" | "BUTTON";
	show: boolean /** 是否显示路由 */;
	parentPermissionId: string | null /**null为顶级 */;
}
