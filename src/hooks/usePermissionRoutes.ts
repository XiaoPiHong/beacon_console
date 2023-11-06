import { shallowEqual, useSelector } from "react-redux";
import { IStoreState } from "@/store/types";
import { useEffect, useState } from "react";
import { whiteRoutes, baseRoutes, lazyLoad, IRoute } from "@/router/indes";
import { transformTree, mapTree } from "@/utils/tree";
import { cloneDeep } from "lodash-es";

export default function () {
	/** 获取到权限 */
	const { permission } = useSelector((state: IStoreState) => ({ permission: state.user.permission }), shallowEqual);

	/** 先生成默认路由表 */
	const [routes, setRoutes] = useState<IRoute[]>([...whiteRoutes, ...baseRoutes]);

	useEffect(() => {
		/** 生成树 */
		const permissionTree = transformTree(
			null,
			permission.filter(per => per.type === "ROUTE"),
			{
				idKey: "permissionId",
				parentIdKey: "parentPermissionId",
				formatNode: ({ id, data, children }) => ({
					id,
					children,
					label: data.permissionName,
					path: data.permissionCode
				})
			}
		);
		/** 递归树生成权限路由表 */
		const newRoutes: IRoute[] = mapTree(cloneDeep(permissionTree), {
			formatNode: (node, parentNode) => {
				const parentPath = parentNode ? parentNode.path : "";
				const path = `${parentPath}${node.path}`;
				console.log(path);
				return {
					path,
					/**
					 * /page/name 替换成 page/name
					 * /page/name/:id/:name 替换成 page/name
					 *
					 * */
					element: lazyLoad(path.replace(/^\//, "").replace(/\/:[^/]+/g, "")),
					children: node.children
				};
			}
		});
		setRoutes(newRoutes);
	}, [permission]);

	return {
		routes
	};
}
