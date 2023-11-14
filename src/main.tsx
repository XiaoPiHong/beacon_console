import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 使用历史模式路由实现跳转
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import store from "@/store/index";

import "@/assets/styles/index.less";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ConfigProvider
		theme={{
			token: {
				colorPrimary: "#438eb9"
			}
		}}
	>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</ConfigProvider>
);
