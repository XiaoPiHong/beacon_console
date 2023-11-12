import { Outlet } from "react-router-dom";
import style from "./index.module.less";
import LayoutHeader from "./layoutHeader";
import LayoutTabs from "./layoutTabs";
import LayoutMain from "./layoutMain";

function Layout() {
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
					<Outlet />
				</LayoutMain>
			</div>
		</div>
	);
}

export default Layout;
