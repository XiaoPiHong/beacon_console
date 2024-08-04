import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Input, Button, Checkbox } from "antd";
import { IXphFormProps } from "xph-crud";

export const getAccountLoginFormProps = ({ methods, loading, onClickLoginBtn }): IXphFormProps => {
	return {
		items: [
			{
				name: "username",
				label: "",
				component: "Input",
				required: true,
				initialValue: "xph-admin",
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
				initialValue: "Admin@1234",
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

export const getEmailLoginFormProps = ({ loading, countDown, onClickLoginBtn, onClickGetCodeBtn }): IXphFormProps => {
	return {
		items: [
			{
				name: "email",
				label: "",
				component: "Input",
				required: true,
				componentProps: {
					prefix: <MailOutlined />,
					placeholder: "邮箱"
				},
				rules: [{ type: "email", message: "请输入正确的邮箱" }]
			},
			{
				name: "emailCode",
				label: "",
				required: true,
				render: ({ model }) => {
					return (
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
							<Input placeholder="邮箱验证码" />
							<Button disabled={countDown < 60} onClick={onClickGetCodeBtn} type="primary">
								{countDown < 60 ? countDown : "获取验证码"}
							</Button>
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
