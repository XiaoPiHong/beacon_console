import { lazy, Suspense, ComponentType } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/layout";
import Home from "@/views/home";
import Login from "@/views/login";
// import Register from "@/views/register";
import { useSelector, shallowEqual } from "react-redux";
import { IStoreState } from "@/store/types";
import { getUserInfo, getPermission } from "@/store/actions/user";
import { useDispatch } from "react-redux";
import Loading from "@/components/loading";
import * as utilsStorage from "@/utils/storage";

export interface IRoute {
	path: string;
	element: JSX.Element;
	children?: IRoute[];
	meta?: Record<string, any>;
}

const modules = import.meta.glob("../views/**/*.tsx");

/**
 * @description 快速导入工具函数
 * @param moduleName 模块路径
 * @param props 传递给加载模块的属性
 */
export const lazyLoad = (moduleName: string, props?: any) => {
	const Module = lazy(modules[`../views/${moduleName}/index.tsx`] as () => Promise<{ default: ComponentType<any> }>);
	return (
		/** 如果在懒加载组件尚未加载完成时尝试访问该组件会报错，使用Suspense处理 */
		<Suspense fallback={<Loading />}>
			<Module {...props} />
		</Suspense>
	);
};

interface IRouteAppraisalProps {
	children: JSX.Element;
}
/**
 * @description 登录鉴权组件
 */
export const RouteAppraisal = ({ children }: IRouteAppraisalProps) => {
	const accessToken = utilsStorage.local.accessToken.get();

	const { userInfo } = useSelector((state: IStoreState) => ({ userInfo: state.user.userInfo }), shallowEqual);
	const dispatch = useDispatch();
	const Module = lazy(async () => {
		if (accessToken && !userInfo) {
			console.log("触发了刷新");
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
			default: accessToken ? () => children : () => <Navigate to="/login" />
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
 */
export const getWhiteRoutes = (): Array<IRoute> => {
	return [
		{
			path: "/login",
			element: utilsStorage.local.accessToken.get() ? <Navigate replace to="/home" /> : <Login />
		}
		// {
		// 	path: "/register",
		// 	element: <Register />
		// },
		// {
		// 	path: "/user",
		// 	element: <Layout />,
		// 	children: [
		// 		{
		// 			path: "userManage",
		// 			element: <RouteAppraisal>{lazyLoad("user/userManage")}</RouteAppraisal>,
		// 			meta: { title: "用户管理", closable: true }
		// 		}
		// 	]
		// }
	];
};

/**
 * @description 基本路由表（基本路由表不可修改）
 */
export const getBaseRoutes = (newRoutes: Array<IRoute>): Array<IRoute> => {
	return [
		{
			path: "/",
			element: <Navigate to="/home" />
		},
		...newRoutes,
		{
			path: "/home",
			element: <Layout />,
			children: [
				{
					path: "",
					element: (
						<RouteAppraisal>
							<Home />
						</RouteAppraisal>
					),
					meta: { title: "首页", closable: false }
				}
			]
		},
		{
			path: "*",
			element: <Layout />,
			children: [
				{
					path: "*",
					element: <RouteAppraisal>{lazyLoad("error", { type: 404 })}</RouteAppraisal>,
					meta: { title: "错误页", closable: true }
				}
			]
		}
	];
};
