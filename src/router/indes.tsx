import { lazy, ComponentType, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/layout";

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

// 路由鉴权组件
export const Appraisal = ({ children }: { children: JSX.Element }) => {
	const token = localStorage.getItem("token");
	return token ? children : <Navigate to="/login" />;
};

// 白名单路由表
export const whiteRoutes: Array<IRoute> = [
	{
		path: "/login",
		element: lazyLoad("login")
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
				element: <Appraisal>{lazyLoad("home")}</Appraisal>
			}
		]
	},
	{
		path: "*",
		element: <Layout />,
		children: [
			{
				path: "*",
				element: <Appraisal>{lazyLoad("error", { type: 404 })}</Appraisal>
			}
		]
	}
];
