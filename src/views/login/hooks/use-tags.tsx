import { TabsProps } from "antd";
import { AccountSigninForm, EmailSigninForm } from "../components";

/**
 * hook：tags
 */
export default function () {
	let tabsActiveKey = "1";
	const tabsList: TabsProps["items"] = [
		{
			key: "1",
			label: "账号",
			children: <AccountSigninForm />
		},
		{
			key: "2",
			label: "邮箱",
			children: <EmailSigninForm />
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
