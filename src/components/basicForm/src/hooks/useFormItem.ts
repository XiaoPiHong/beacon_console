import { IFormPorps, TFormItemProps } from "../types";
import { isBoolean, isFunction, cloneDeep } from "lodash-es";

export default function (props: IFormPorps) {
	const { items, wrapperCol = { span: 24 } } = props;
	/** 控制表单项显示与隐藏 */
	function getShow(item: TFormItemProps): { isShow: boolean; isIfShow: boolean } {
		const { show, ifShow } = item;
		let isShow = true;
		let isIfShow = true;
		if (isBoolean(show)) {
			isShow = show;
		}
		if (isBoolean(ifShow)) {
			isIfShow = ifShow;
		}
		if (isFunction(show)) {
			/** 防止污染源对象 */
			isShow = show(cloneDeep(item));
		}
		if (isFunction(ifShow)) {
			/** 防止污染源对象 */
			isIfShow = ifShow(cloneDeep(item));
		}
		return { isShow, isIfShow };
	}

	/** 控制表单项栅格布局 */
	function getCol(item: TFormItemProps) {
		return {
			wrapperCol: {
				...wrapperCol,
				...item.wrapperCol
			}
		};
	}

	/** 过滤出isShow为true的 */
	const formItems = items
		.map(item => {
			const { isIfShow, isShow } = getShow(item);
			const { wrapperCol } = getCol(item);
			return {
				...item,
				show: isShow,
				ifShow: isIfShow,
				wrapperCol
			};
		})
		/** 过滤出要渲染的项 */
		.filter(item => item.ifShow);

	return {
		formItems
	};
}
