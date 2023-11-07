import { Outlet } from "react-router-dom";

function Layout() {
	return (
		<div>
			<p>布局</p>
			<section>{<Outlet />}</section>
		</div>
	);
}

export default Layout;
