import { lazy } from "react";
import { Navigate } from "react-router-dom";

export interface IRoute {
	path: string;
	element: JSX.Element;
	children?: IRoute[];
}

// 快速导入工具函数
const lazyLoad = (moduleName: string) => {
	const Module = lazy(() => import(`@/views/${moduleName}`));
	return <Module />;
};

// 路由鉴权跟组件
// const Appraisal = ({ children }: any) => {
// 	const token = localStorage.getItem("token");
// 	return token ? children : <Navigate to="/login" />;
// };

// 白名单路由表
export const whiteRoutes: Array<IRoute> = [
	{
		path: "/login",
		element: lazyLoad("login")
	}
];

// 基本路由表
export const baseRoutes: Array<IRoute> = [
	{
		path: "/",
		element: <Navigate to="/home" />
	},
	{
		path: "*",
		element: lazyLoad("error")
	}
];
