import { IFormPorps } from "../types";
import { useFormItemShow, useFormItemWrapperCol, useFormItemRules } from ".";

export default function (props: IFormPorps) {
	const { items } = props;

	const formItems = items
		.map(item => {
			const { isIfShow, isShow } = useFormItemShow(item);
			const { wrapperCol } = useFormItemWrapperCol({ item, formProps: props });
			const { rules } = useFormItemRules({ item, show: isShow, formProps: props });
			return {
				...item,
				show: isShow,
				ifShow: isIfShow,
				wrapperCol,
				rules
			};
		})
		/** 过滤出要渲染的项 */
		.filter(item => item.ifShow);

	return {
		formItems
	};
}
