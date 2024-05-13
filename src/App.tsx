import { useRoutes } from "react-router-dom";
import usePermissionRoutes from "@/hooks/usePermissionRoutes";
import { RouterProvider } from "@/hooks/useRouterContext";

const App = () => {
	const { routes, pageMetas } = usePermissionRoutes();

	// 根据路由表生成对应的路由规则
	const element = useRoutes(routes);
	return <RouterProvider pageMetas={pageMetas}>{element}</RouterProvider>;
};

export default App;
