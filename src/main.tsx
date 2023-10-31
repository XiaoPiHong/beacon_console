import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 使用历史模式路由实现跳转
import "@/assets/styles/index.less";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
