import { Tabs } from "antd";
import { useEffect, useRef, MutableRefObject } from "react";
import { useLocation, matchPath, useNavigate } from "react-router-dom";
import { useRouterMetas } from "@/hooks/useRouterMetas";
import { shallowEqual, useSelector } from "react-redux";
import { IStoreState } from "@/store/types";
import { IMeta } from "@/hooks/usePermissionRoutes";
import { KeepAliveRef } from "keepalive-for-react";

const LayoutTabs = ({ aliveRef }: { aliveRef: MutableRefObject<KeepAliveRef | undefined> }) => {
	const navigate = useNavigate();
	const symbolStr = Symbol("tab");
	const location = useLocation();
	const { routerMetas } = useRouterMetas();
	const { permission } = useSelector((state: IStoreState) => ({ permission: state.user.permission }), shallowEqual);
	let activeKey = `${symbolStr.description}${"/home"}`;
	const tabs = useRef<Map<string, IMeta>>(
		new Map([
			[
				`${symbolStr.description}${"/home"}`,
				{
					url: "/home",
					meta: { title: "首页", closable: false },
					children: []
				}
			]
		])
	);

	const setOtherTab = () => {
		/** 获取到权限 */
		if (permission.length) {
			/** matchPath完全匹配路由 */
			/** 匹配不上的都会走到错误页的路由，所以curRoute一定会匹配上一个 */
			const curRoute = routerMetas.find(item => matchPath(item.url, location.pathname))!;
			const key = `${symbolStr.description}${location.pathname}`;
			tabs.current.set(key, curRoute);
			activeKey = key;
		}
	};

	const onChangeTabs = (key: string) => {
		navigate(key.split(`${symbolStr.description}`)[1]);
	};

	const onRemoveTabs = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: "add" | "remove") => {
		if (action === "remove") {
			tabs.current.delete(targetKey as string);
			/** 清除一下keepalive缓存 */
			aliveRef.current?.removeCache((targetKey as string).split(`${symbolStr.description}`)[1]);

			/** 删除后选中最后一个 */
			const all = Array.from(tabs.current);
			const key = all[all.length - 1][0];
			navigate(key.split(`${symbolStr.description}`)[1]);
		}
	};

	setOtherTab();

	useEffect(() => {
		return () => {
			tabs.current.clear();
		};
	}, []);
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
