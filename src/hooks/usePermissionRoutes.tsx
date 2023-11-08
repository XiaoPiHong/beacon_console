import { shallowEqual, useSelector } from "react-redux";
import { IStoreState } from "@/store/types";
import { IPermission } from "@/store/constant/user";
import { useEffect, useState } from "react";
import { whiteRoutes, baseRoutes, lazyLoad, RouteAppraisal, IRoute } from "@/router/indes";
import { transformTree } from "@/utils/tree";
import Layout from "@/layout";
import { cloneDeep } from "lodash-es";

type TPermissionTreeNode = IPermission & {
	url: string; // 完整路径
	children: TPermissionTreeNode[]; // 子级
};

/**
 *
 * 格式化路径
 * /page/name 替换成 page/name
 * /page/name/:id/:name 替换成 page/name
 *
 * */
const formatterUrl = (path: string) => {
	return path.replace(/^\//, "").replace(/\/:[^/]+/g, "");
};

/** 获取路由表路径 */
const getRoutePath = (parentNode: TPermissionTreeNode | null, node: TPermissionTreeNode) => {
	const flag = !!parentNode;
	switch (flag) {
		/** 有父级 */
		case true: {
			/** 返回 role */
			return node.permissionCode.replace(/^\//, "");
		}
		/** 无父级 */
		case false: {
			/** 返回 /system */
			return node.permissionCode;
		}
	}
};

/** 获取路由表组件 */
const getRouteElement = (parentNode: TPermissionTreeNode | null, node: TPermissionTreeNode) => {
	const flag = !!parentNode;
	switch (flag) {
		case true: {
			/** 返回自身模块 */
			const path = node.url;
			return <RouteAppraisal>{lazyLoad(formatterUrl(path))}</RouteAppraisal>;
		}
		case false: {
			/** 返回布局模块 */
			return <Layout />;
		}
	}
};

/** 获取路由表子级 */
const getRouteChildren = (parentNode: TPermissionTreeNode | null, node: TPermissionTreeNode) => {
	const flag = !!parentNode;
	switch (flag) {
		case true: {
			return initRoutes(node.children, node);
		}
		case false: {
			/** 无子级 & 无父级 为其增添一个空路径子路由 */
			if (node.children!.length === 0) {
				return [
					{
						path: "",
						element: <RouteAppraisal>{lazyLoad(formatterUrl(node.permissionCode))}</RouteAppraisal>
					}
				];
			}
			return initRoutes(node.children, node);
		}
	}
};

/** 递归树生成权限路由表 */
const initRoutes = (list: TPermissionTreeNode[], parentNode: any = null): IRoute[] => {
	return list.map((node: TPermissionTreeNode) => {
		node.url = (parentNode?.url || "") + node.permissionCode;
		return {
			path: getRoutePath(parentNode, node),
			element: getRouteElement(parentNode, node),
			children: getRouteChildren(parentNode, node)
		};
	});
};

export default function () {
	/** 获取到权限 */
	const { permission } = useSelector((state: IStoreState) => ({ permission: state.user.permission }), shallowEqual);

	/** 先生成默认路由表 */
	const [routes, setRoutes] = useState<IRoute[]>([...whiteRoutes, ...baseRoutes]);

	useEffect(() => {
		/** 生成树 */
		const permissionTree: TPermissionTreeNode[] = transformTree(
			null,
			permission.filter(per => per.type === "ROUTE"),
			{
				idKey: "permissionId",
				parentIdKey: "parentPermissionId",
				formatNode: ({ data, children }) => ({
					...data,
					children
				})
			}
		);
		/** 递归树生成权限路由表 */
		const newRoutes = initRoutes(cloneDeep(permissionTree));
		setRoutes([...whiteRoutes, ...newRoutes, ...baseRoutes]);
	}, [permission]);

	return {
		routes,
		setRoutes
	};
}
