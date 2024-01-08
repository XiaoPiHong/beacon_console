import { IFormPorps, TFormItemProps } from "../types";
import { isBoolean, isFunction, cloneDeep } from "lodash-es";
import { ColProps } from "antd";

/** 控制表单项显示与隐藏 */
export function useFormItemShow(item: TFormItemProps): { isShow: boolean; isIfShow: boolean } {
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
export function useFormItemWrapperCol({ item, formProps }: { item: TFormItemProps; formProps: IFormPorps }) {
	const { wrapperCol = { span: 24 } } = formProps;
	return {
		wrapperCol: {
			...wrapperCol,
			...item.wrapperCol
		}
	};
}

/** 控制表单项校验规则 */
export { default as useFormItemRules } from "./useFormItemRules";

/** 控制表单项 */
export { default as useFormItem } from "./useFormItem";
