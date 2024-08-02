import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getEmailLoginFormProps } from "../indexConfig";
import { XphForm, useXphForm, IXphFormActionType } from "xph-crud";
import { postSendMailForSignIn } from "@/apis/auth";

/** store exports */
import { connect } from "react-redux";
import { IStoreState } from "@/store/types";
import { loginByEmail } from "@/store/actions/user";

interface ILoginFormProps {
	user: IStoreState["user"];
	loginByEmail: (args?: any) => Promise<any>;
}

/**
 * 登录表单
 */
const LoginForm = (props: ILoginFormProps) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [countDown, setCountDown] = useState(60);
	const realCountDown = useRef(countDown);

	const onClickGetCodeBtn = () => {
		methods.validator(["email"]).then(({ email }) => {
			postSendMailForSignIn({ email }).then(res => {
				let timer: null | NodeJS.Timeout = null;
				timer = setInterval(() => {
					console.log("定时器");
					if (realCountDown.current <= 0) {
						clearInterval(timer!);
						timer = null;
						realCountDown.current = 60;
						setCountDown(60);
					} else {
						setCountDown(prevCountDown => prevCountDown - 1);
						realCountDown.current = realCountDown.current - 1;
					}
				}, 1000);
			});
		});
	};

	const onClickLoginBtn = () => {
		methods.validator().then(({ email, emailCode }) => {
			setLoading(true);

			props
				.loginByEmail({
					email,
					emailCode
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
	const formProps = getEmailLoginFormProps({ loading, countDown, onClickLoginBtn, onClickGetCodeBtn });

	const reactFormRef = useRef<IXphFormActionType>(null);

	return <XphForm register={register} ref={reactFormRef} {...formProps}></XphForm>;
};

/**
 * 使用 connect()() 创建并暴露容器组件（connect函数会自动将action creators绑定到dispatch上，因此你可以直接在组件中调用这些action creators，而不需要显式地使用dispatch。）
 */
export default connect(
	(state: IStoreState) => ({
		user: state.user
	}),
	{ loginByEmail }
)(LoginForm);
