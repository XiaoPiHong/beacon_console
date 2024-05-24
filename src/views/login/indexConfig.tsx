import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Checkbox, Button } from "antd";
import { IXphFormProps } from "xph-form";

export const getLoginFormProps = ({ methods, loading, onClickLoginBtn }): IXphFormProps => {
	return {
		items: [
			{
				name: "username",
				label: "",
				component: "Input",
				required: true,
				componentProps: {
					prefix: <UserOutlined />,
					placeholder: "用户名"
				}
			},
			{
				name: "password",
				label: "",
				component: "InputPassword",
				required: true,
				componentProps: {
					prefix: <LockOutlined />,
					placeholder: "密码"
				}
			},
			{
				name: "remember",
				label: "",
				initialValue: false,
				valuePropName: "checked",
				render: ({ model }) => {
					return (
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
							<Checkbox
								checked={model.remember}
								onChange={e => {
									methods.setFieldsValue({
										remember: e.target.checked
									});
								}}
							>
								记住账号
							</Checkbox>
							<Button type="link">忘记密码</Button>
						</div>
					);
				}
			},
			{
				name: "submit",
				label: "",
				component: "Button",
				componentProps: {
					type: "primary",
					children: "登录",
					style: { width: "100%" },
					loading,
					onClick: onClickLoginBtn
				}
			}
		]
	};
};

export const getRegisterFormProps = ({ methods, loading, onClickRegisterBtn }): IXphFormProps => {
	return {
		items: [
			{
				name: "username",
				label: "",
				component: "Input",
				required: true,
				componentProps: {
					prefix: <UserOutlined />,
					placeholder: "用户名"
				}
			},
			{
				name: "password",
				label: "",
				component: "InputPassword",
				required: true,
				componentProps: {
					prefix: <LockOutlined />,
					placeholder: "密码"
				}
			},
			{
				name: "remember",
				label: "",
				initialValue: false,
				valuePropName: "checked",
				render: ({ model }) => {
					return (
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
							<Checkbox
								checked={model.remember}
								onChange={e => {
									methods.setFieldsValue({
										remember: e.target.checked
									});
								}}
							>
								记住账号
							</Checkbox>
							<Button type="link">忘记密码</Button>
						</div>
					);
				}
			},
			{
				name: "submit",
				label: "",
				component: "Button",
				componentProps: {
					type: "primary",
					children: "注册",
					style: { width: "100%" },
					loading,
					onClick: onClickRegisterBtn
				}
			}
		]
	};
};
