import { connect } from "react-redux";
import { IStoreState } from "@/store/types";
import { Menu } from "antd";
import useMenu from "@/hooks/useMenu";
import { useNavigate } from "react-router-dom";
interface IMenuProps {
	permission: IStoreState["user"]["permission"];
}

const HeaderMenu = ({ permission }: IMenuProps) => {
	const navigate = useNavigate();

	const { menu } = useMenu({
		formatNode: ({ permissionId, url, permissionName, children }) => {
			return {
				key: permissionId,
				label: permissionName,
				url: url,
				children: children.length ? children : undefined
			};
		}
	});

	const onSelectMenu = (e: any) => {
		const {
			props: { url }
		} = e.item;
		navigate(url);
	};

	return <Menu id="menu" onSelect={onSelectMenu} mode="horizontal" items={menu} />;
};

export default connect((state: IStoreState) => ({
	permission: state.user.permission
}))(HeaderMenu);
