import { createContext, useContext, useState } from "react";
import { cloneDeep } from "lodash-es";
import { ConfigProvider } from "antd";

const rootStyles = getComputedStyle(document.documentElement);

/** 驼峰转"-"拼接 */
const camelToKebab = (str: string) => str.replace(/([A-Z])/g, "-$1").toLowerCase();

/** 基本配置 */
const baseThemeToken = {
	borderRadius: 0
};

/** 默认主题 */
const defaultTheme = {
	theme: {
		token: {
			...baseThemeToken,
			colorPrimary: rootStyles.getPropertyValue("--color-primary")
		}
	}
};

interface IThemeToken {
	colorPrimary: string;
}

interface IThemeContext {
	theme: {
		token: IThemeToken;
	};
	updateTheme: (args: IThemeToken) => void;
}

const ThemeContext = createContext<IThemeContext>({
	theme: cloneDeep(defaultTheme.theme),
	updateTheme: () => {}
});

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
	const [theme, setTheme] = useState(cloneDeep(defaultTheme.theme));

	/**
	 * @description 更新主题颜色变量，先更新theme变量中的颜色，再更新css全局颜色变量
	 * @param newTheme 新主题颜色变量
	 */
	const updateTheme = (newTheme = {} as any) => {
		/** 更新theme主题变量 */
		setTheme(prevTheme => ({
			token: {
				...prevTheme.token,
				...newTheme
			}
		}));
		/** 更新css全局变量 */
		Object.keys(newTheme).forEach(key => {
			document.documentElement.style.setProperty(`--${camelToKebab(key)}`, newTheme[key]);
		});
	};

	return (
		<ThemeContext.Provider value={{ theme, updateTheme }}>
			<ConfigProvider theme={theme}>{children}</ConfigProvider>
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
