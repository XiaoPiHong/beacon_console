import { shallowEqual, useSelector } from "react-redux";
import { IStoreState } from "@/store/types";
import { lazyLoad } from "@/router/indes";

interface IPageAppraisalProps {
	children: JSX.Element;
	permissionCode: string;
}

/**
 * @description 页面查询鉴权组件(只有当前页面有 permissionCode="view" && type="BUTTON" 权限时，才能访问该页面，否者跳转到error 403页面)
 * @description 只有需要路由鉴权的页面才需使用该组件
 * @param IPageAppraisalProps IPageAppraisalProps:{children:子元素,permissionCode:当前路由对应的权限permissionCode}
 */
export const PageAppraisal = ({ children, permissionCode }: IPageAppraisalProps) => {
	/** 获取所有权限 */
	const { permission } = useSelector((state: IStoreState) => ({ permission: state.user.permission }), shallowEqual);

	/** 当前路由对应的权限 */
	const pagePermission = permission.find(item => item.permissionCode === permissionCode);

	/** 当前路由有的权限 */
	const buttonsPermission = permission.filter(
		item => item.parentPermissionId === pagePermission?.permissionId && item.type === "BUTTON"
	);

	/** 有view权限才可以查看当前页面，否则跳转错误页 403 */
	const hasViewPermission = buttonsPermission.find(item => item.permissionCode === "view");
	return hasViewPermission ? children : lazyLoad("error", { type: 403 });
};

export default function () {}
