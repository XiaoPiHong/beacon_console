import { shallowEqual, useSelector } from "react-redux";
import { IStoreState } from "@/store/types";
// import { transformTree } from "@/utils/tree";
import { useEffect } from "react";
import { whiteRoutes, baseRoutes, IRoute } from "@/router/indes";
import { useState } from "react";

export default function () {
	/** 获取到权限 */
	const { permission } = useSelector((state: IStoreState) => ({ permission: state.user.permission }), shallowEqual);

	const [routes] = useState<IRoute[]>([...whiteRoutes, ...baseRoutes]);

	useEffect(() => {
		/** 生成树 */
		// const pageTree = transformTree(
		// 	null,
		// 	permission.filter(per => per.type === "ROUTE"),
		// 	{
		// 		idKey: "permissionId",
		// 		parentIdKey: "parentPermissionId",
		// 		formatNode: ({ id, data, children }) => ({
		// 			id,
		// 			children,
		// 			label: data.permissionName
		// 		})
		// 	}
		// );
		// console.log(pageTree);
	}, [permission]);

	return {
		routes
	};
}
