import { connect } from "react-redux";
import { IStoreState } from "@/store/types";
import { transformTree } from "@/utils/tree";
import { useEffect, useState } from "react";
import { Menu } from "antd";
import { ConfigProvider } from "antd";
import { useTheme } from "@/hooks/useTheme";
interface IMenuProps {
	permission: IStoreState["user"]["permission"];
}

interface IHeaderMenu {
	key: string;
	label: string;
	children?: IHeaderMenu[];
}

function HeaderMenu({ permission }: IMenuProps) {
	const { theme } = useTheme();

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

	return (
		<ConfigProvider
			theme={{
				components: {
					Menu: theme.systemComponentsTheme.Menu
				}
			}}
		>
			<Menu id="menu" onClick={onClick} mode="horizontal" items={menus} />
		</ConfigProvider>
	);
}

export default connect((state: IStoreState) => ({
	permission: state.user.permission
}))(HeaderMenu);
