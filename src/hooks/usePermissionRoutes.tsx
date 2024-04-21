import { IPermission } from "@/store/constant/user";
import { getWhiteRoutes, getBaseRoutes, lazyLoad, RouteAppraisal, IRoute } from "@/router";
import { formatterUrl } from "@/utils";
import Layout from "@/layout";
import { PageAppraisal } from "@/hooks/usePermission";
import useMenu from "@/hooks/useMenu";

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
			/** 无父级 & 无子级 为其增添一个空路径子路由 */
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
	const { menu } = useMenu({
		filterUnShowRoute: false
	});
	console.log(menu);

	/** 递归树生成权限路由表 */
	const newRoutes = initRoutes(menu);
	const routes: IRoute[] = [...getWhiteRoutes(), ...getBaseRoutes(newRoutes)];
	return {
		routes
	};
}
