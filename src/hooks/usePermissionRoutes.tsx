import { IPermission } from "@/store/constant/user";
import { getWhiteRoutes, getBaseRoutes, lazyLoad, RouteAppraisal, IRoute } from "@/router";
import { formatterUrl } from "@/utils";
import Layout from "@/layout";
import { PageAppraisal } from "@/hooks/usePermission";
import useMenu from "@/hooks/useMenu";
import { Outlet } from "react-router-dom";

type TPermissionTreeNode = IPermission & {
	url: string; // 完整路径
	children: TPermissionTreeNode[]; // 子级
};

/** 获取路由表路径 */
const getRoutePath = (parentNode: TPermissionTreeNode | null, node: TPermissionTreeNode) => {
	const flag = !!parentNode;
	switch (flag) {
		case true: {
			return node.permissionCode.replace(/^\//, "");
		}
		case false: {
			return node.permissionCode;
		}
	}
};

/** 获取路由表组件 */
const getRouteElement = (parentNode: TPermissionTreeNode | null, node: TPermissionTreeNode) => {
	const flag = !!parentNode;
	const { url } = node;
	switch (flag) {
		case true: {
			if (node.children.length) {
				return <Outlet />;
			} else {
				return (
					<RouteAppraisal>
						<PageAppraisal url={url} id={node.permissionId}>
							{lazyLoad(formatterUrl(url))}
						</PageAppraisal>
					</RouteAppraisal>
				);
			}
		}
		case false: {
			return <Layout />;
		}
	}
};

/** 获取路由表子级 */
const getRouteChildren = (parentNode: TPermissionTreeNode | null, node: TPermissionTreeNode) => {
	const flag = !!parentNode;
	const { url } = node;
	switch (flag) {
		case true: {
			return initRoutes(node.children, node);
		}
		case false: {
			/** 无父级 & 无子级 为其增添一个空路径子路由 */
			if (!node.children.length) {
				return [
					{
						path: "",
						element: (
							<RouteAppraisal>
								<PageAppraisal url={url} id={node.permissionId}>
									{lazyLoad(formatterUrl(url))}
								</PageAppraisal>
							</RouteAppraisal>
						),
						meta: { title: node.permissionName, closable: node.closable }
					}
				];
			} else {
				return initRoutes(node.children, node);
			}
		}
	}
};

/** 递归树生成权限路由表 */
const initRoutes = (list: TPermissionTreeNode[], parentNode: TPermissionTreeNode | null = null): IRoute[] => {
	return list.map((node: TPermissionTreeNode) => {
		node.url = (parentNode?.url || "") + node.permissionCode;
		return {
			path: getRoutePath(parentNode, node),
			element: getRouteElement(parentNode, node),
			children: getRouteChildren(parentNode, node),
			meta: { title: node.permissionName, closable: node.closable }
		};
	});
};

export interface IMeta {
	url: string;
	children: IMeta[];
	meta: Record<string, any>;
}
export default function () {
	const { menu } = useMenu({
		filterUnShowRoute: false
	});
	/** 递归树生成权限路由表 */
	const newRoutes = initRoutes(menu);
	const routes: IRoute[] = [...getWhiteRoutes(), ...getBaseRoutes(newRoutes)];

	/** 新生成的routes包含了一些自定义的路由，重新将这些路由拼接一下完整的路径 */
	const getTreeMetas = (tree: IRoute[], parentNode: IRoute | null = null): IMeta[] => {
		return tree.map(item => {
			/**  404路由直接返回子 */
			if (item.path.includes("*")) return { url: item.children![0].path, children: [], meta: item.children![0].meta || {} };

			const url = parentNode ? `${parentNode.path + (item.path ? "/" + item.path : "")}` : item.path;
			const children = getTreeMetas(item.children || [], { ...item, path: url });
			const curNode = { url, children, meta: item.meta || {} };
			return curNode;
		});
	};

	/** 取最后一级 */
	const getRouterMetas = (metas: IMeta[]) => {
		const routerMetas: IMeta[] = [];

		metas.forEach(item => {
			if (item.children && item.children.length) {
				routerMetas.push(...getRouterMetas(item.children));
			} else {
				routerMetas.push({ meta: item.meta, url: item.url, children: [] });
			}
		});
		return routerMetas;
	};

	const routerMetas = getRouterMetas(getTreeMetas(routes));
	return {
		routes,
		routerMetas
	};
}
