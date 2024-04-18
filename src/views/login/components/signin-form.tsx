import { useState, useRef } from "react";
import * as apisAuth from "@/apis/auth";
import * as utilsStorage from "@/utils/storage";
import { useNavigate } from "react-router-dom";
import { getLoginFormProps } from "../indexConfig";
import { ReactForm, useReactForm, IReactFormActionType } from "xph-form";

/**
 * 登录表单
 */
export default function () {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const onClickLoginBtn = () => {
		methods.validator().then(values => {
			console.log(values);
			setLoading(true);
			apisAuth
				.postAuthSignin(values)
				.then(res => {
					const data = res.data;
					utilsStorage.local.token.set(data.token);
					utilsStorage.local.user.set(data.user);
				})
				.finally(() => {
					setLoading(false);
				});
		});
	};
	console.log("=======================================parent render");
	const [register, methods] = useReactForm();
	const formProps = getLoginFormProps({ methods, loading, onClickLoginBtn });

	const reactFormRef = useRef<IReactFormActionType>();

	return <ReactForm register={register} ref={reactFormRef} {...formProps}></ReactForm>;
}
