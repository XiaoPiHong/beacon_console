import "./App.less";
import { useRoutes } from "react-router-dom";
// import Layout from "@/layout";
import usePermissionRoutes from "@/hooks/usePermissionRoutes";
import Login from "@/views/login";

function App() {
	const { routes } = usePermissionRoutes();

	console.log(routes);

	// 根据路由表生成对应的路由规则
	const element = useRoutes(routes);
	return (
		<div>
			{/* <Layout></Layout> */}
			<Login></Login>
			<>{element}</>
		</div>
	);
}

export default App;
