import { useState } from "react";
import { getRegisterFormProps } from "../indexConfig";
import { XphForm, useXphForm } from "xph-crud";

/**
 * 注册表单
 */
export default function () {
	const [loading, setLoading] = useState(false);
	const [register, methods] = useXphForm();

	const onClickRegisterBtn = () => {
		setLoading(true);
		setLoading(false);
	};

	const formProps = getRegisterFormProps({ methods, loading, onClickRegisterBtn });

	return <XphForm register={register} {...formProps}></XphForm>;
}
