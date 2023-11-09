import { lazy, Suspense, ComponentType } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/layout";
import { PageAppraisal } from "@/hooks/usePermission";
import { useSelector, shallowEqual } from "react-redux";
import { IStoreState } from "@/store/types";
import { getUserInfo, getPermission } from "@/store/actions/user";
import { useDispatch } from "react-redux";

export interface IRoute {
	path: string;
	element: JSX.Element;
	children?: IRoute[];
}

// /**/ 表示二级目录 一般二级目录就够了  不够再加即可
const modules = import.meta.glob("../views/**/*.tsx");

// 快速导入工具函数
export const lazyLoad = (moduleName: string, props?: { type: number }) => {
	const Module = lazy(modules[`../views/${moduleName}/index.tsx`] as () => Promise<{ default: ComponentType<any> }>);
	return (
		/** 如果在懒加载组件尚未加载完成时尝试访问该组件会报错，使用Suspense处理 */
		<Suspense>
			<Module {...props} />;
		</Suspense>
	);
};

/**
 * 路由鉴权组件
 */
export const RouteAppraisal = ({ children }: { children: JSX.Element }) => {
	const token = localStorage.getItem("token");

	const { userInfo } = useSelector((state: IStoreState) => ({ userInfo: state.user.userInfo }), shallowEqual);
	const dispatch = useDispatch();

	const Module = lazy(async () => {
		if (token && !userInfo) {
			const _u = await getUserInfo();
			const _p = await getPermission();
			dispatch(_u);
			dispatch(_p);
		}

		return {
			default: token ? () => children : () => <Navigate to="/login" />
		};
	});

	return (
		<Suspense>
			<Module />
		</Suspense>
	);
};

/**
 * 白名单路由注意点：
 * 1、白名单路由需不需要鉴权根据业务需求来定，需要则包裹在Appraisal组件中
 * 2、默认白名单中的路由都是无需页面鉴权的
 *
 */
// 白名单路由
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

// 基本路由表（基本路由表不可修改）
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
						<PageAppraisal>{lazyLoad("home")}</PageAppraisal>
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
