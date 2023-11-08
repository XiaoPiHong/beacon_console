import { shallowEqual, useSelector } from "react-redux";
import { IStoreState } from "@/store/types";
import { lazyLoad } from "@/router/indes";
import { useLocation } from "react-router-dom";

/** 页面鉴权组件
 *
 * 只有当前页面有 view 权限时，才能访问该页面，否者跳转到error 403页面
 *
 */
export const PageAppraisal = ({ children }: { children: JSX.Element }) => {
	/** 获取到权限 */
	const { permission } = useSelector((state: IStoreState) => ({ permission: state.user.permission }), shallowEqual);
	const location = useLocation();
	console.log(location);
	return permission ? children : lazyLoad("error", { type: 403 });
};

export default function () {}
