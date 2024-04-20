import { shallowEqual, useSelector } from "react-redux";
import { IStoreState } from "@/store/types";
import { IPermission } from "@/store/constant/user";
import { useEffect, useState } from "react";
import { getWhiteRoutes, getBaseRoutes, lazyLoad, RouteAppraisal, IRoute } from "@/router";
import { transformTree } from "@/utils/tree";
import { formatterUrl } from "@/utils";
import { cloneDeep, get } from "lodash-es";
import Layout from "@/layout";
import { PageAppraisal } from "@/hooks/usePermission";

type TPermissionTreeNode = IPermission & {
	url: string; // 完整路径
	children: TPermissionTreeNode[]; // 子级
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
			return (
				<RouteAppraisal>
					<PageAppraisal url={node.url} id={node.permissionId}>
						{lazyLoad(formatterUrl(path))}
					</PageAppraisal>
				</RouteAppraisal>
			);
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
						element: (
							<RouteAppraisal>
								<PageAppraisal url={node.url} id={node.permissionId}>
									{lazyLoad(formatterUrl(node.permissionCode))}
								</PageAppraisal>
							</RouteAppraisal>
						)
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
	const [routes, setRoutes] = useState<IRoute[]>([...getWhiteRoutes(), ...getBaseRoutes([])]);

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
		setRoutes([...getWhiteRoutes(), ...getBaseRoutes(newRoutes)]);
	}, [permission]);

	return {
		routes,
		setRoutes
	};
}
