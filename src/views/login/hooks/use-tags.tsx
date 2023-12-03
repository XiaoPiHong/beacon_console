import { TabsProps } from "antd";
import { SigninForm, SignupForm } from "../components";

/**
 * hook：tags
 */
export default function () {
	let tabsActiveKey = "1";
	const tabsList: TabsProps["items"] = [
		{
			key: "1",
			label: "登录",
			children: <SigninForm />
		},
		{
			key: "2",
			label: "注册",
			children: <SignupForm />
		}
	];

	/**
	 * event：改变 tabs
	 * @param key tab key
	 */
	const onChangeTabs = (key: string) => {
		tabsActiveKey = key;
	};

	return {
		tabsActiveKey,
		tabsList,
		onChangeTabs
	};
}
