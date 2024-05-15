import { useOutlet, useLocation } from "react-router-dom";
import style from "./index.module.less";
import LayoutHeader from "./layoutHeader";
import LayoutTabs from "./layoutTabs";
import LayoutMain from "./layoutMain";
import { useRef } from "react";
import KeepAlive from "keepalive-for-react";

const Layout = () => {
	console.log("layout");
	let outlet = useOutlet();
	const keepAliveRef = useRef(null);
	const { pathname } = useLocation();

	return (
		<div className={style["app-container"]}>
			<div className={style["app-container__header"]}>
				<LayoutHeader></LayoutHeader>
			</div>
			<div className={style["app-container__tabs"]}>
				<LayoutTabs></LayoutTabs>
			</div>
			<div className={style["app-container__main"]}>
				<LayoutMain>
					<KeepAlive aliveRef={keepAliveRef} activeName={pathname} cache={true}>
						{outlet}
					</KeepAlive>
				</LayoutMain>
			</div>
		</div>
	);
};

export default Layout;
