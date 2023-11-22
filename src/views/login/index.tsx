import { connect } from "react-redux";
import { IStoreState } from "@/store/types";
import { login } from "@/store/actions/user";
import style from "./index.module.less";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { getLoginFormItem } from "./indexConfig";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

interface ILoginProps {
	user: IStoreState["user"];
	login: (args?: any) => Promise<any>;
}

function Login(props: ILoginProps) {
	const navigate = useNavigate();

	const { updateTheme } = useTheme();

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

	const test = () => {
		updateTheme({
			systemTheme: {
				theme: {
					token: {
						colorPrimary: "red"
					}
				}
			},
			systemComponentsTheme: {
				Menu: {
					itemBg: "green"
				}
			}
		});
	};

	return (
		<div className={style["login"]}>
			<div className={style["login__body"]}>
				<div className={style["login__header"]}>
					<div className={style["login__logo"]}></div>
					<h1>项目管理系统</h1>
					<p>项目无忧，系统成就</p>
					<h2 onClick={test}>登录</h2>
				</div>
				<div className={style["login__content"]}>
					<Form name="basic" wrapperCol={{ span: 24 }} onFinish={onFinish} autoComplete="off">
						<>{formItems.username}</>
						<>{formItems.password}</>
						<>{formItems.remember}</>
						<>{formItems.submit}</>
					</Form>
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
