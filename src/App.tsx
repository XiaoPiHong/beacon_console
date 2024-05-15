import usePermissionRoutes from "@/hooks/usePermissionRoutes";
import { RouterMetasProvider } from "@/hooks/useRouterMetas";

const App = () => {
	const { routes, routerMetas } = usePermissionRoutes();

	return <RouterMetasProvider routerMetas={routerMetas} routes={routes}></RouterMetasProvider>;
};

export default App;
