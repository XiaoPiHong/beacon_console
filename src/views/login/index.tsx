import { connect } from "react-redux";
import { IStoreState } from "@/store/types";
import { login } from "@/store/actions/user";
import style from "./index.module.less";
import { Form, Input, Checkbox, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface ILoginProps {
	user: IStoreState["user"];
	login: (args?: any) => Promise<any>;
}

function Login(props: ILoginProps) {
	const navigate = useNavigate();

	const onFinish = (values: any) => {
		console.log(values);
		props.login().then(() => {
			navigate("/home");
		});
	};
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
							<Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
								<Input prefix={<UserOutlined />} placeholder="用户名" />
							</Form.Item>

							<Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
								<Input.Password prefix={<LockOutlined />} placeholder="密码" />
							</Form.Item>

							<Form.Item name="remember" valuePropName="checked">
								<div style={{ display: "flex", justifyContent: "space-between" }}>
									<Checkbox>记住账号</Checkbox>
									<a>忘记密码</a>
								</div>
							</Form.Item>

							<Form.Item>
								<Button style={{ width: "100%" }} type="primary" htmlType="submit">
									登录
								</Button>
							</Form.Item>
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
