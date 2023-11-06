interface ITreeOption {
	idKey: string;
	parentIdKey: string;
	formatNode?: (node: any) => any;
}

/**
 * 解析返回 tree 数据结构
 * @param parentId 根组件标识
 * @param list 数据列表
 * @param option 选项配置
 * @returns 返回 tree 数据结构
 */
export const transformTree = (parentId: string | number | null, list: any[], option: ITreeOption) => {
	const { idKey, parentIdKey, formatNode = node => node } = option;

	const handleFn = (parentId: string | number | null, list: any[]) => {
		const result: any = [];
		for (let i = 0, len = list.length; i < len; i++) {
			const item = list[i];
			const itemParentId = item[parentIdKey];
			const itemId = item[idKey];

			if (itemParentId === parentId) {
				const node = {
					id: itemId,
					data: item,
					children: handleFn(itemId, list)
				};
				result.push(formatNode(node));
			}
		}
		return result;
	};

	return handleFn(parentId, list);
};

interface IMapTreeOption {
	formatNode?: (node: any, parentNode: any) => any;
	childrenKey?: string;
}

/** 递归遍历树，返回新结构树
 * @param tree 树数据
 * @param option 选项配置
 * @param parentNode 父节点（默认为null）
 */
export const mapTree = (tree: any[], option: IMapTreeOption, parentNode = null) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { childrenKey = "children", formatNode = (node: any, pNode = parentNode) => node } = option;

	return tree.map(node => {
		const children = node[childrenKey];
		if (children) {
			const parentNode = { ...node };
			node.children = mapTree(children, option, parentNode);
		}
		return formatNode(node, parentNode);
	});
};
