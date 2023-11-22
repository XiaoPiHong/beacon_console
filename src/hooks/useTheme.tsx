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
	/** 系统主题 */
	systemTheme: {
		theme: {
			token: {
				...baseSystemThemeToken,
				colorPrimary: rootStyles.getPropertyValue("--color-primary")
			}
		}
	},
	/** 系统组件主题：如：顶部菜单
	 * 因为直接改变系统主题的色值，会出现系统组件主题色调冲突的情况，所以需要单独配置系统组件主题
	 */
	systemComponentsTheme: {
		Menu: {
			itemBg: rootStyles.getPropertyValue("--menu-item-bg")
		}
	}
};

interface ITheme {
	systemTheme: {
		theme: {
			token: {
				colorPrimary: string;
			};
		};
	};
	systemComponentsTheme: {
		Menu: {
			itemBg: string;
		};
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
	 * 递归newTheme更新css全局变量
	 */
	const updateCssVar = (obj: any) => {
		Object.keys(obj).forEach(key => {
			if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
				updateCssVar(obj[key]);
			} else {
				console.log(`--${camelToKebab(key)}`);
				document.documentElement.style.setProperty(`--${camelToKebab(key)}`, obj[key]);
			}
		});
	};

	/**
	 * @description 更新主题颜色变量，先更新theme变量中的颜色，再更新css全局颜色变量
	 * @param newTheme 新主题颜色变量
	 */
	const updateTheme = (newTheme = {} as any) => {
		/** 更新theme主题变量 */
		setTheme(prevTheme => ({
			...deepMerge(prevTheme, newTheme)
		}));
		/** 递归更新css全局变量 */
		updateCssVar(newTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, updateTheme }}>
			<ConfigProvider theme={theme.systemTheme.theme}>{children}</ConfigProvider>
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
