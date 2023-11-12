import { lazy, Suspense, ComponentType } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/layout";
import { PageAppraisal } from "@/hooks/usePermission";
import { useSelector, shallowEqual } from "react-redux";
import { IStoreState } from "@/store/types";
import { getUserInfo, getPermission } from "@/store/actions/user";
import { useDispatch } from "react-redux";
import Loading from "@/components/loading";

export interface IRoute {
	path: string;
	element: JSX.Element;
	children?: IRoute[];
}

// /**/ 表示二级目录 一般二级目录就够了  不够再加即可
const modules = import.meta.glob("../views/**/*.tsx");

/**
 * @description 快速导入工具函数
 * @param string moduleName:模块路径
 * @param any props:传递给加载模块的属性
 */
export const lazyLoad = (moduleName: string, props?: any) => {
	const Module = lazy(modules[`../views/${moduleName}/index.tsx`] as () => Promise<{ default: ComponentType<any> }>);
	return (
		/** 如果在懒加载组件尚未加载完成时尝试访问该组件会报错，使用Suspense处理 */
		<Suspense fallback={<Loading />}>
			<Module {...props} />;
		</Suspense>
	);
};

interface IRouteAppraisalProps {
	children: JSX.Element;
}
/**
 * @description 登录鉴权组件
 * @param IRouteAppraisalProps {children:子节点}
 */
export const RouteAppraisal = ({ children }: IRouteAppraisalProps) => {
	const token = localStorage.getItem("token");

	const { userInfo } = useSelector((state: IStoreState) => ({ userInfo: state.user.userInfo }), shallowEqual);
	const dispatch = useDispatch();

	const Module = lazy(async () => {
		if (token && !userInfo) {
			await Promise.all([getUserInfo(), getPermission()])
				.then(([_u, _p]) => {
					dispatch(_u);
					dispatch(_p);
				})
				.catch(() => {
					return {
						/** 请求基本信息失败跳错误页 500 */
						default: () => lazyLoad("error", { type: 500 })
					};
				});
		}

		return {
			default: token ? () => children : () => <Navigate to="/login" />
		};
	});

	return (
		<Suspense fallback={<Loading />}>
			<Module />
		</Suspense>
	);
};

/**
 * @description 白名单路由表
 * @description 白名单路由表注意点：
 * 1、白名单路由需不需要登录鉴权根据业务需求来定，需要则包裹在RouteAppraisal组件中
 * 2、默认白名单中的路由都是无需页面鉴权的
 */
export const whiteRoutes: Array<IRoute> = [
	{
		path: "/login",
		element: localStorage.getItem("token") ? <Navigate replace to="/home" /> : lazyLoad("login")
	},
	{
		path: "/system",
		element: <Layout />,
		children: [
			{
				path: "department",
				element: lazyLoad("system/department")
			}
		]
	}
];

/**
 * @description 基本路由表（基本路由表不可修改）
 */
export const baseRoutes: Array<IRoute> = [
	{
		path: "/",
		element: <Navigate to="/home" />
	},
	{
		path: "/home",
		element: <Layout />,
		children: [
			{
				path: "",
				element: (
					<RouteAppraisal>
						<PageAppraisal permissionCode="/home">{lazyLoad("home")}</PageAppraisal>
					</RouteAppraisal>
				)
			}
		]
	},
	{
		path: "*",
		element: <Layout />,
		children: [
			{
				path: "*",
				element: <RouteAppraisal>{lazyLoad("error", { type: 404 })}</RouteAppraisal>
			}
		]
	}
];
