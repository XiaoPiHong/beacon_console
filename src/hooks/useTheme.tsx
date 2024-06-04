import { createContext, useContext, useState } from "react";
import { cloneDeep } from "lodash-es";
import { ConfigProvider } from "antd";
import { deepMerge } from "@/utils";

const rootStyles = getComputedStyle(document.documentElement);

/** 驼峰转"-"拼接 */
const camelToKebab = (str: string) => str.replace(/([A-Z])/g, "-$1").toLowerCase();

/** 基本配置 */
const baseSystemThemeToken = {
	borderRadius: 0
};

/** 默认主题 */
const defaultTheme = {
	token: {
		...baseSystemThemeToken,
		colorPrimary: rootStyles.getPropertyValue("--color-primary"),
		colorLink: rootStyles.getPropertyValue("--color-link"),

		menuColor: rootStyles.getPropertyValue("--menu-color"),
		menuHoverBg: rootStyles.getPropertyValue("--menu-hover-bg")
	}
};

interface ITheme {
	token: {
		colorPrimary: string;
		colorLink: string;

		menuColor: string;
		menuHoverBg: string;
	};
}

interface IThemeContext {
	theme: ITheme;
	updateTheme: (args: ITheme) => void;
}

const ThemeContext = createContext<IThemeContext>({
	theme: cloneDeep(defaultTheme),
	updateTheme: () => {}
});

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
	const [theme, setTheme] = useState(cloneDeep(defaultTheme));

	/**
	 * @description 递归newTheme更新css全局变量
	 * @param obj 递归的对象
	 * @param prefix 前缀
	 * @param isComCssVar 是否系统组件主题变量（如果是系统组件变量需要拼接上组件名称）
	 *
	 */
	const updateCssVar = (obj: any) => {
		Object.keys(obj).forEach(key => {
			if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
				updateCssVar(obj[key]);
			} else {
				document.documentElement.style.setProperty(`--${camelToKebab(key)}`, obj[key]);
			}
		});
	};

	/**
	 * @description 更新主题颜色变量，先更新theme变量中的颜色，再更新css全局颜色变量
	 * @param newTheme 新主题颜色变量
	 */
	const updateTheme = (newTheme = {} as any) => {
		setTheme(prevTheme => ({
			...deepMerge(prevTheme, newTheme)
		}));
		updateCssVar(newTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, updateTheme }}>
			<ConfigProvider theme={theme}>{children}</ConfigProvider>
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
