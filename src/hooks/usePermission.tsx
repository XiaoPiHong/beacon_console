import { shallowEqual, useSelector } from "react-redux";
import { IStoreState } from "@/store/types";
import { lazyLoad } from "@/router";
import { Outlet } from "react-router-dom";

interface IPageAppraisalProps {
	/** 子节点 */
	children: JSX.Element;
	/** 页面完整路径 */
	url: string;
	/** 页面的唯一标识 */
	id: string;
}

/**
 * @description 页面查询鉴权组件
 * @description 只有需要路由鉴权的页面才需使用该组件
 * @param IPageAppraisalProps
 */
export const PageAppraisal = ({ children, url, id }: IPageAppraisalProps) => {
	/** 获取所有权限 */
	const { permission } = useSelector((state: IStoreState) => ({ permission: state.user.permission }), shallowEqual);

	/** 当前路由 */
	const pagePermission = permission.find(item => item.permissionId === id);

	/** 当前路由的按钮权限 */
	const buttonsPermission = permission.filter(
		item => item.parentPermissionId === pagePermission?.permissionId && item.type === "BUTTON"
	);
	/** 当前路由的路由权限 */
	const routesPermission = permission.filter(
		item => item.parentPermissionId === pagePermission?.permissionId && item.type === "ROUTE"
	);

	let hasViewPermission = false;

	if (routesPermission.length > 0) {
		/** 有子路由直接放行，放行一个路由占位组件 */
		return <Outlet />;
	} else if (buttonsPermission.length > 0) {
		/** 有view权限才可以查看当前页面，否则跳转错误页 403 */
		const viewPermission = buttonsPermission.findIndex(item => item.permissionCode === "view") !== -1;
		hasViewPermission = viewPermission;
	}
	return hasViewPermission ? children : lazyLoad("error", { type: 403 });
};
