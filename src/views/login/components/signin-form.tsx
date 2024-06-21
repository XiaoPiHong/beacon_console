import { useState, useRef } from "react";
// import * as apisAuth from "@/apis/auth";
// import * as utilsStorage from "@/utils/storage";
import { useNavigate } from "react-router-dom";
import { getLoginFormProps } from "../indexConfig";
import { XphForm, useXphForm, IXphFormActionType } from "xph-crud";

/** store exports */
import { connect } from "react-redux";
import { IStoreState } from "@/store/types";
import { login } from "@/store/actions/user";

interface ILoginFormProps {
	user: IStoreState["user"];
	login: (args?: any) => Promise<any>;
}

/**
 * 登录表单
 */
const LoginForm = (props: ILoginFormProps) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const onClickLoginBtn = () => {
		methods.validator().then(values => {
			console.log(values);
			setLoading(true);
			// apisAuth
			// 	.postAuthSignin(values)
			// 	.then(res => {
			// 		const data = res.data;
			// 		utilsStorage.local.token.set(data.token);
			// 		utilsStorage.local.user.set(data.user);
			// 	})
			// 	.finally(() => {
			// 		setLoading(false);
			// 	});
			props
				.login()
				.then(() => {
					navigate("/home");
				})
				.finally(() => {
					setLoading(false);
				});
		});
	};
	console.log("=======================================parent render");
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
	{ login }
)(LoginForm);
