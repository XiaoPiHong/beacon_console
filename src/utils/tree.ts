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
