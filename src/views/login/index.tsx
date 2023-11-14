import { connect } from "react-redux";
import { IStoreState } from "@/store/types";
import { login } from "@/store/actions/user";
import style from "./index.module.less";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { getLoginFormItem } from "./indexConfig";
import { useState } from "react";

interface ILoginProps {
	user: IStoreState["user"];
	login: (args?: any) => Promise<any>;
}

function Login(props: ILoginProps) {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const onFinish = (values: any) => {
		console.log(values);
		setLoading(true);
		props
			.login()
			.then(() => {
				navigate("/home");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const formItems = getLoginFormItem({ loading });

	return (
		<div className={style["login"]}>
			<div className={style["login-container"]}>
				<div className={style["login-container-header"]}>
					<div className={style["login-container-header__logo"]}></div>
					<h1>项目管理系统</h1>
					<p>项目无忧，系统成就</p>
					<h2>登录</h2>
				</div>
				<div className={style["login-container-section"]}>
					<div className={style["login-container-section__form"]}>
						<Form name="basic" wrapperCol={{ span: 24 }} onFinish={onFinish} autoComplete="off">
							<>{formItems.username}</>
							<>{formItems.password}</>
							<>{formItems.remember}</>
							<>{formItems.submit}</>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
}

//使用connect()()创建并暴露容器组件
export default connect(
	(state: IStoreState) => ({
		user: state.user
	}),
	{ login }
)(Login);
