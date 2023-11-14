import { connect } from "react-redux";
import { IStoreState } from "@/store/types";
import { transformTree } from "@/utils/tree";
import { useEffect, useState } from "react";
import { Menu } from "antd";

interface IMenuProps {
	permission: IStoreState["user"]["permission"];
}

interface IHeaderMenu {
	key: string;
	label: string;
	children?: IHeaderMenu[];
}

function HeaderMenu({ permission }: IMenuProps) {
	const [menus, setMenus] = useState<Array<IHeaderMenu>>([]);

	const onClick = (e: any) => {
		console.log(e);
	};

	useEffect(() => {
		setMenus(
			transformTree(
				null,
				permission.filter(per => per.type === "ROUTE"),
				{
					idKey: "permissionId",
					parentIdKey: "parentPermissionId",
					formatNode: ({ data, children }) => ({
						key: data.permissionId,
						label: data.permissionName,
						children: children.length ? children : undefined
					})
				}
			)
		);
	}, [permission]);

	return <Menu style={{ backgroundColor: "#438eb9" }} onClick={onClick} mode="horizontal" items={menus} />;
}

export default connect((state: IStoreState) => ({
	permission: state.user.permission
}))(HeaderMenu);
