import { Menu } from "antd";
import useMenu from "@/hooks/useMenu";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import { useRouter } from "@/hooks/useRouterContext";

const HeaderMenu = () => {
	console.log("render menu");
	const navigate = useNavigate();
	const location = useLocation();
	const { pageMetas } = useRouter();
	const { menu } = useMenu({
		formatNode: ({ permissionId, url, permissionName, children }) => {
			return {
				key: url,
				label: permissionName,
				url: url,
				children: children.length ? children : undefined
			};
		}
	});

	const getCurItem = () => {
		const curRoute = pageMetas.find(item => matchPath(item.url, location.pathname))!;
		return curRoute;
	};

	const onSelectMenu = (e: any) => {
		const {
			props: { url }
		} = e.item;
		navigate(url);
	};

	return <Menu id="menu" selectedKeys={[getCurItem().url]} onSelect={onSelectMenu} mode="horizontal" items={menu} />;
};

export default HeaderMenu;
