// import { useRoutes } from "react-router-dom";
import "./App.less";
import Login from "@/views/login";
import usePermissionRoutes from "@/hooks/usePermissionRoutes";

function App() {
	const { routes } = usePermissionRoutes();

	console.log(routes);

	// 根据路由表生成对应的路由规则
	// const element = useRoutes(routes);
	// return <div>{element}</div>;
	return <Login></Login>;
}

export default App;
