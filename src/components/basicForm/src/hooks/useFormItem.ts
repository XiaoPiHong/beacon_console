import { IFormPorps } from "../types";
export default function (props: IFormPorps) {
	const { items: formItems } = props;
	return {
		formItems
	};
}
