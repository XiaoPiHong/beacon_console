import { lazy, ComponentType } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/layout";

export interface IRoute {
	path: string;
	element: JSX.Element;
	children?: IRoute[];
}

// /**/ 表示二级目录 一般二级目录就够了  不够在加即可
const modules = import.meta.glob("../views/**/*.tsx");

// 快速导入工具函数
export const lazyLoad = (moduleName: string, props?: { type: number }) => {
	const Module = lazy(modules[`../views/${moduleName}/index.tsx`] as () => Promise<{ default: ComponentType<any> }>);
	return <Module {...props} />;
};

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
		path: "/home",
		element: <Layout />,
		children: [
			{
				path: "",
				element: lazyLoad("home")
			}
		]
	},
	{
		path: "*",
		element: <Layout />,
		children: [
			{
				path: "*",
				element: lazyLoad("error", { type: 404 })
			}
		]
	}
];
