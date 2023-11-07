import { shallowEqual, useSelector } from "react-redux";
import { IStoreState } from "@/store/types";
import { useEffect, useState } from "react";
import { whiteRoutes, baseRoutes, lazyLoad, IRoute } from "@/router/indes";
import { transformTree, mapTree } from "@/utils/tree";
import Layout from "@/layout";
import { cloneDeep } from "lodash-es";

type TPermissionNode = IRoute & {
	url: string;
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
const getRoutePath = (parentNode: TPermissionNode | null, node: TPermissionNode) => {
	const flag = !!parentNode;
	switch (flag) {
		/** 有父级 */
		case true: {
			return node.path.replace(/^\//, "");
		}
		/** 无父级 */
		case false: {
			return node.path;
		}
	}
};

/** 获取路由表组件 */
const getRouteElement = (parentNode: TPermissionNode | null, node: TPermissionNode) => {
	const flag = !!parentNode;
	switch (flag) {
		case true: {
			const path = node.url;
			return lazyLoad(formatterUrl(path));
		}
		case false: {
			return <Layout />;
		}
	}
};

/** 获取路由表子级 */
const getRouteChildren = (parentNode: TPermissionNode | null, node: TPermissionNode) => {
	const flag = !!parentNode;
	switch (flag) {
		case true: {
			return node.children;
		}
		case false: {
			if (node.children!.length === 0) {
				return [
					{
						path: "",
						element: lazyLoad(formatterUrl(node.path))
					}
				];
			}
			return node.children;
		}
	}
};

export default function () {
	/** 获取到权限 */
	const { permission } = useSelector((state: IStoreState) => ({ permission: state.user.permission }), shallowEqual);

	/** 先生成默认路由表 */
	const [routes, setRoutes] = useState<IRoute[]>([...whiteRoutes, ...baseRoutes]);

	useEffect(() => {
		/** 生成树 */
		const permissionTree: TPermissionNode[] = transformTree(
			null,
			permission.filter(per => per.type === "ROUTE"),
			{
				idKey: "permissionId",
				parentIdKey: "parentPermissionId",
				formatNode: ({ id, data, children }) => ({
					id,
					children: children.map((item: IRoute) => {
						return {
							...item,
							url: data.permissionCode + item.path // url是完整路径
						};
					}),
					label: data.permissionName,
					path: data.permissionCode,
					url: data.permissionCode
				})
			}
		);
		console.log(permissionTree);
		/** 递归树生成权限路由表 */
		const newRoutes: IRoute[] = mapTree(cloneDeep(permissionTree), {
			formatNode: (node, parentNode) => {
				return {
					path: getRoutePath(parentNode, node),
					element: getRouteElement(parentNode, node),
					children: getRouteChildren(parentNode, node)
				};
			}
		});
		setRoutes([...whiteRoutes, ...newRoutes, ...baseRoutes]);
		console.log(newRoutes);
	}, [permission]);

	return {
		routes
	};
}
