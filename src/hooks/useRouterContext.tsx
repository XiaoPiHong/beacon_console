import { createContext, useContext } from "react";
import { IMeta } from "./usePermissionRoutes";
import { useRoutes } from "react-router-dom";
import { IRoute } from "@/router";

const RouterContext = createContext<{
	pageMetas: IMeta[];
}>({
	pageMetas: []
});

export const RouterProvider = ({ pageMetas, routes }: { pageMetas: IMeta[]; routes: IRoute[] }) => {
	// 根据路由表生成对应的路由规则
	const element = useRoutes(routes);

	return <RouterContext.Provider value={{ pageMetas }}>{element}</RouterContext.Provider>;
};

export const useRouter = () => useContext(RouterContext);
