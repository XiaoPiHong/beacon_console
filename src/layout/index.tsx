import { useOutlet, useLocation } from "react-router-dom";
import style from "./index.module.less";
import LayoutHeader from "./layoutHeader";
import LayoutTabs from "./layoutTabs";
import LayoutMain from "./layoutMain";
import KeepAlive, { useKeepaliveRef } from "keepalive-for-react";
import { useRouterMetas } from "@/hooks/useRouterMetas";
import { useEffect, useState, useMemo } from "react";

const Layout = () => {
	console.log("layout");
	const { routes } = useRouterMetas();
	const { pathname } = useLocation();
	const keepAliveRef = useKeepaliveRef();
	const [refresh, setRefresh] = useState(0);
	const outlet = useOutlet();

	useEffect(() => {
		/** 路由表每改变一次都触发key值更改，重新挂载KeepAlive */
		setRefresh(refresh + 1);
	}, [routes]);

	const key = useMemo(() => {
		/** 首次让其不要触发,否者KeepAlive销毁会触发多次RouteAppraisal校验（多次请求） */
		/** 这样KeepAlive就会挂载2次，key为1时候一次（此时routes为基本的路由），key为2的时候一次（此时routes是异步获取的路由） */
		if (refresh === 0) return 1;
		return refresh;
	}, [refresh]);

	return (
		<div className={style["app-container"]}>
			<div className={style["app-container__header"]}>
				<LayoutHeader />
			</div>
			<div className={style["app-container__tabs"]}>
				<LayoutTabs aliveRef={keepAliveRef} />
			</div>
			<div className={style["app-container__main"]}>
				<LayoutMain>
					<KeepAlive key={key} aliveRef={keepAliveRef} activeName={pathname} cache={true}>
						{outlet}
					</KeepAlive>
				</LayoutMain>
			</div>
		</div>
	);
};

export default Layout;
