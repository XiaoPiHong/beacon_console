import { shallowEqual, useSelector } from "react-redux";
import { IStoreState } from "@/store/types";
import { transformTree } from "@/utils/tree";
import { cloneDeep } from "lodash-es";

interface IUseMenuProps {
	/** 格式化树结构函数 */
	formatNode?: (...args) => { [key: string]: any };
	/** 是否包含按钮权限的树 */
	includeButton?: boolean;
	/** 是否过滤不显示的路由 */
	filterUnShowRoute?: boolean;
}

const baseFormatNode = ({ data, children }) => {
	return {
		...data,
		children
	};
};

/** 添加一些额外属性 */
const addAttribute = (tree: any, parentNode: any = null, formatNode?: (...args) => { [key: string]: any }) => {
	return tree.map(item => {
		const curNode = {
			...item,
			url: parentNode ? `${parentNode.url + item.permissionCode}` : item.permissionCode
		};
		curNode.children = addAttribute(item.children, curNode, formatNode);
		return formatNode ? formatNode(curNode) : curNode;
	});
};

export default function ({ formatNode, includeButton = false, filterUnShowRoute = true }: IUseMenuProps) {
	/** 获取到权限 */
	const { permission } = useSelector((state: IStoreState) => ({ permission: state.user.permission }), shallowEqual);

	/** 条件 */
	const condition = item => {
		let flag = true;
		if (!includeButton) {
			flag = flag && item.type === "ROUTE";
		}

		if (filterUnShowRoute) {
			flag = flag && item.show === true;
		}
		return flag;
	};

	const filterPermission = cloneDeep(permission.filter(item => condition(item)));
	const menu = addAttribute(
		transformTree(null, filterPermission, {
			idKey: "permissionId",
			parentIdKey: "parentPermissionId",
			formatNode: node => baseFormatNode(node)
		}),
		null,
		formatNode
	);

	return {
		menu
	};
}
