import { useState } from "react";
import { Form } from "antd";
import { getLoginFormItem } from "../indexConfig";

/**
 * 注册表单
 */
export default function () {
	const [loading] = useState(false);
	const formItems = getLoginFormItem({ loading });

	return (
		<Form name="basic" wrapperCol={{ span: 24 }} autoComplete="off">
			<>{formItems.username}</>
			<>{formItems.password}</>
			<>{formItems.remember}</>
			<>{formItems.submit}</>
		</Form>
	);
}
