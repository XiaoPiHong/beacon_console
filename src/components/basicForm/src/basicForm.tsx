import { Form, Row } from "antd";
import { IFormPorps } from "./types";
import { useFormItem } from "./hooks";
import FormItem from "./components/formItem";

function BasicForm(props: IFormPorps) {
	const { formItems } = useFormItem(props);
	return (
		<Form>
			<Row>
				{formItems.map((item, index) => (
					<FormItem key={index} {...item} />
				))}
			</Row>
		</Form>
	);
}

export default BasicForm;
