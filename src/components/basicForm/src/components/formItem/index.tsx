import { Form, Col } from "antd";
import { TFormItemProps } from "../../types";
import style from "./index.module.less";

function FormItem(props: TFormItemProps) {
	const { show } = props;
	return (
		<Col className={!show ? style["form-item-hidden"] : ""}>
			<Form.Item></Form.Item>
		</Col>
	);
}
export default FormItem;
