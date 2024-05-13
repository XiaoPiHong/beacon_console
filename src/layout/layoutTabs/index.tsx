import { Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import { useLocation, matchPath, useNavigate } from "react-router-dom";
import { useRouter } from "@/hooks/useRouterContext";
import { shallowEqual, useSelector } from "react-redux";
import { IStoreState } from "@/store/types";
import { IMeta } from "@/hooks/usePermissionRoutes";

const LayoutTabs = () => {
	// console.log("render tabs");
	const symbolStr = Symbol("tab");
	const location = useLocation();
	const { pageMetas } = useRouter();
	const { permission } = useSelector((state: IStoreState) => ({ permission: state.user.permission }), shallowEqual);
	const tabs = useRef<Map<string, IMeta>>(new Map());
	const [activeKey, setActiveKey] = useState<string>("");
	const navigate = useNavigate();

	const setHomeTab = () => {
		tabs.current.set(`${symbolStr.description}${"/home"}`, {
			url: "/home",
			meta: { title: "首页", closable: false },
			children: []
		});
		setActiveKey(`${symbolStr.description}${"/home"}`);
	};

	const setOtherTab = () => {
		/** 获取到权限 */
		if (permission.length) {
			/** matchPath完全匹配路由 */
			/** 匹配不上的都会走到错误页的路由，所以curRoute一定会匹配上一个 */
			const curRoute = pageMetas.find(item => matchPath(item.url, location.pathname))!;
			const key = `${symbolStr.description}${location.pathname}`;
			tabs.current.set(key, curRoute);
			setActiveKey(key);
		}
	};

	useEffect(() => {
		setHomeTab();
		setOtherTab();
	}, [pageMetas]);

	useEffect(() => {
		return () => {
			tabs.current.clear();
		};
	}, []);

	const onChangeTabs = (key: string) => {
		setActiveKey(key);
		navigate(key.split(`${symbolStr.description}`)[1]);
	};

	const onRemoveTabs = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: "add" | "remove") => {
		if (action === "remove") {
			tabs.current.delete(targetKey as string);

			/** 删除后选中最后一个 */
			const all = Array.from(tabs.current);
			const key = all[all.length - 1][0];
			setActiveKey(key);
			navigate(key.split(`${symbolStr.description}`)[1]);
		}
	};

	return (
		<Tabs
			activeKey={activeKey}
			type="editable-card"
			hideAdd
			items={Array.from(tabs.current).map(item => {
				return {
					key: item[0],
					label: item[1].meta.title,
					closable: item[1].meta.closable,
					children: null
				};
			})}
			onChange={onChangeTabs}
			onEdit={onRemoveTabs}
		/>
	);
};
export default LayoutTabs;
