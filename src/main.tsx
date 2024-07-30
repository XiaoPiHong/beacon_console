// import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 使用历史模式路由实现跳转
import { Provider } from "react-redux";
import store from "@/store/index";
import "@/assets/styles/index.less";
import { ThemeProvider } from "@/hooks/useTheme";
import App from "./App";
import { XphExtendCompPropsProvider } from "xph-crud";

const { VITE_ROUTER_BASENAME } = import.meta.env;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	// <React.StrictMode>
	<ThemeProvider>
		<Provider store={store}>
			<BrowserRouter basename={VITE_ROUTER_BASENAME}>
				<XphExtendCompPropsProvider
					value={{
						extendProps: {
							/** 弹窗默认都放在.cache-component中 */
							dialog: {
								getPopperContainer: () => document.getElementsByClassName("cache-component")[0] as HTMLElement
							}
						}
					}}
				>
					<App />
				</XphExtendCompPropsProvider>
			</BrowserRouter>
		</Provider>
	</ThemeProvider>
	// </React.StrictMode>
);
