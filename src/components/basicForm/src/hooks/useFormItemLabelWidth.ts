import { isNumber } from "lodash-es";
import { TFormItemProps, IFormPorps } from "../types";

export default function ({ itemProps, formProps }: { itemProps: TFormItemProps; formProps: IFormPorps }) {
	const { labelCol = {}, wrapperCol = {} } = itemProps;
	const { labelWidth } = itemProps;

	const { labelWidth: globalLabelWidth, labelCol: globalLabelCol, wrapperCol: globWrapperCol, layout } = formProps;

	// If labelWidth is set globally, all items setting
	if (!globalLabelWidth && !labelWidth && !globalLabelCol) {
		labelCol.style = {
			textAlign: "left"
		};
		return { labelCol, wrapperCol };
	}
	let width = labelWidth || globalLabelWidth;
	const col = { ...globalLabelCol, ...labelCol };
	const wrapCol = { ...globWrapperCol, ...wrapperCol };

	if (width) {
		width = isNumber(width) ? `${width}px` : width;
	}

	return {
		labelCol: { style: { width }, ...col },
		wrapperCol: {
			style: {
				width: layout === "vertical" ? "100%" : `calc(100% - ${width})`
			},
			...wrapCol
		}
	};
}
