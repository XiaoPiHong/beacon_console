import { Form, Col } from "antd";
import { IFormPorps, TFormItemProps } from "../../types";
import style from "./index.module.less";
import { useFormItemColProps } from "../../hooks";

function FormItem({ formProps, itemProps }: { formProps: IFormPorps; itemProps: TFormItemProps }) {
	const { name, label, rules, show, labelCol, wrapperCol } = itemProps;
	const { realColProps } = useFormItemColProps({ itemProps, formProps });
	return (
		<Col {...realColProps} className={!show ? style["form-item-hidden"] : ""}>
			<Form.Item name={name} label={label} rules={rules} labelCol={labelCol} wrapperCol={wrapperCol}></Form.Item>
		</Col>
	);
}
export default FormItem;
