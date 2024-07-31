import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getLoginFormProps } from "../indexConfig";
import { XphForm, useXphForm, IXphFormActionType } from "xph-crud";
import cryptoJS from "crypto-js";
import cryptoRandomString from "crypto-random-string";

/** store exports */
import { connect } from "react-redux";
import { IStoreState } from "@/store/types";
import { loginByUsername } from "@/store/actions/user";

interface ILoginFormProps {
	user: IStoreState["user"];
	loginByUsername: (args?: any) => Promise<any>;
}

/**
 * 登录表单
 */
const LoginForm = (props: ILoginFormProps) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const onClickLoginBtn = () => {
		methods.validator().then(({ password, username }) => {
			setLoading(true);

			const timestamp = Date.now().toString();
			const nonceStr = cryptoRandomString({ length: 16, type: "alphanumeric" });
			const signature = cryptoJS.MD5(`${nonceStr}${timestamp}${cryptoJS.MD5(password)}`).toString();

			props
				.loginByUsername({
					username,
					nonceStr,
					timestamp,
					signature
				})
				.then(() => {
					navigate("/home");
				})
				.finally(() => {
					setLoading(false);
				});
		});
	};
	const [register, methods] = useXphForm();
	const formProps = getLoginFormProps({ methods, loading, onClickLoginBtn });

	const reactFormRef = useRef<IXphFormActionType>(null);

	return <XphForm register={register} ref={reactFormRef} {...formProps}></XphForm>;
};

// 使用 connect()() 创建并暴露容器组件
export default connect(
	(state: IStoreState) => ({
		user: state.user
	}),
	{ loginByUsername }
)(LoginForm);
