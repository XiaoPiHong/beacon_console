import { IFormPorps } from "../types";
import { useFormItemShow, useFormItemRules, useFormItemLabelWidth } from ".";

export default function (props: IFormPorps) {
	const { items } = props;

	const formItems = items
		.map(item => {
			const { isIfShow, isShow } = useFormItemShow(item);
			const { rules } = useFormItemRules({ item, show: isShow });
			const { labelCol, wrapperCol } = useFormItemLabelWidth({ itemProps: item, formProps: props });
			return {
				...item,
				show: isShow,
				ifShow: isIfShow,
				rules,
				labelCol,
				wrapperCol
			};
		})
		/** 过滤出要渲染的项 */
		.filter(item => item.ifShow);

	return {
		formItems
	};
}
