// import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 使用历史模式路由实现跳转
import { Provider } from "react-redux";
import store from "@/store/index";
import "@/assets/styles/index.less";
import { ThemeProvider } from "@/hooks/useTheme";
import App from "./App";

const { VITE_ROUTER_BASENAME } = import.meta.env;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	// <React.StrictMode>
	<ThemeProvider>
		<Provider store={store}>
			<BrowserRouter basename={VITE_ROUTER_BASENAME}>
				<App />
			</BrowserRouter>
		</Provider>
	</ThemeProvider>
	// </React.StrictMode>
);
