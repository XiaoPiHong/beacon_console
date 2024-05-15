import { createContext, useContext } from "react";
import { IMeta } from "./usePermissionRoutes";
import { useRoutes } from "react-router-dom";
import { IRoute } from "@/router";

const RouterMetasContext = createContext<{
	routerMetas: IMeta[];
}>({
	routerMetas: []
});

export const RouterMetasProvider = ({ routerMetas, routes }: { routerMetas: IMeta[]; routes: IRoute[] }) => {
	// 根据路由表生成对应的路由规则
	const element = useRoutes(routes);

	return <RouterMetasContext.Provider value={{ routerMetas }}>{element}</RouterMetasContext.Provider>;
};

export const useRouterMetas = () => useContext(RouterMetasContext);
