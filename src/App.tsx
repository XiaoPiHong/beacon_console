import { useRoutes } from "react-router-dom";
import usePermissionRoutes from "@/hooks/usePermissionRoutes";

const App = () => {
	const { routes } = usePermissionRoutes();
	console.log("App render", routes);

	// 根据路由表生成对应的路由规则
	const element = useRoutes(routes);
	return element;
};

export default App;
