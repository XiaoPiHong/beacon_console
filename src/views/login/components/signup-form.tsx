import { useState } from "react";
import { getRegisterFormProps } from "../indexConfig";
import { ReactForm, useReactForm } from "xph-form";

/**
 * 注册表单
 */
export default function () {
	const [loading, setLoading] = useState(false);
	const [register, methods] = useReactForm();

	const onClickRegisterBtn = () => {
		setLoading(true);
		setLoading(false);
	};

	const formProps = getRegisterFormProps({ methods, loading, onClickRegisterBtn });

	return <ReactForm register={register} {...formProps}></ReactForm>;
}
