import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Checkbox, Button, ButtonProps } from "antd";

const formItemConfig = {
	username: {
		itemProps: {
			name: "username",
			rules: [{ required: true, message: "请输入用户名" }]
		},
		comProps: {
			prefix: <UserOutlined />,
			placeholder: "用户名"
		}
	},
	password: {
		itemProps: {
			name: "password",
			rules: [{ required: true, message: "请输入密码" }]
		},
		comProps: {
			prefix: <LockOutlined />,
			placeholder: "密码"
		}
	},
	remember: {
		itemProps: {
			name: "remember",
			valuePropName: "checked"
		},
		comProps: {
			type: "link"
		} as ButtonProps
	},
	submit: {
		comProps: {
			type: "primary",
			htmlType: "submit"
		} as ButtonProps
	}
};

export const getLoginFormItem = ({ loading }: { loading: boolean }) => {
	return {
		username: (
			<Form.Item {...formItemConfig.username.itemProps}>
				<Input {...formItemConfig.username.comProps} />
			</Form.Item>
		),
		password: (
			<Form.Item {...formItemConfig.password.itemProps}>
				<Input.Password {...formItemConfig.password.comProps} />
			</Form.Item>
		),
		remember: (
			<Form.Item {...formItemConfig.remember.itemProps}>
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<Checkbox>记住账号</Checkbox>
					<Button {...formItemConfig.remember.comProps}>忘记密码</Button>
				</div>
			</Form.Item>
		),
		submit: (
			<Form.Item>
				<Button loading={loading} style={{ width: "100%" }} {...formItemConfig.submit.comProps}>
					登录
				</Button>
			</Form.Item>
		)
	};
};
