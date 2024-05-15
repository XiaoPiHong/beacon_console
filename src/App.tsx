import usePermissionRoutes from "@/hooks/usePermissionRoutes";
import { RouterProvider } from "@/hooks/useRouterContext";

const App = () => {
	const { routes, pageMetas } = usePermissionRoutes();

	return <RouterProvider pageMetas={pageMetas} routes={routes}></RouterProvider>;
};

export default App;
