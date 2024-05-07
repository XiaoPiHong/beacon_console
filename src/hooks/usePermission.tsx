import { shallowEqual, useSelector } from "react-redux";
import { IStoreState } from "@/store/types";
import { lazyLoad } from "@/router";

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

	/** 是否有view权限 */
	const hasViewPermission = buttonsPermission.findIndex(item => item.permissionCode === "view") !== -1;

	return hasViewPermission ? children : lazyLoad("error", { type: 403 });
};
