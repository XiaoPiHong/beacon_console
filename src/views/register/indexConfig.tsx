import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, IdcardOutlined } from "@ant-design/icons";
import { Form, Input, Button, ButtonProps } from "antd";

const formItemConfig = {
	username: {
		itemProps: {
			name: "username",
			rules: [{ required: true, message: "请输入用户名" }]
		},
		comProps: {
			prefix: <UserOutlined />,
			placeholder: "用户名（必填）"
		}
	},
	password: {
		itemProps: {
			name: "password",
			rules: [{ required: true, message: "请输入密码" }]
		},
		comProps: {
			prefix: <LockOutlined />,
			placeholder: "密码（必填）"
		}
	},
	phone: {
		itemProps: {
			name: "phone",
			rules: [{ required: true, message: "请输入手机号码" }]
		},
		comProps: {
			prefix: <PhoneOutlined />,
			placeholder: "手机号码（必填）"
		}
	},
	email: {
		itemProps: {
			name: "email"
		},
		comProps: {
			prefix: <MailOutlined />,
			placeholder: "邮箱",
			rules: [{ type: "email", message: "请输入正确的邮箱" }]
		}
	},
	realName: {
		itemProps: {
			name: "realName"
		},
		comProps: {
			prefix: <IdcardOutlined />,
			placeholder: "真实姓名"
		}
	},
	submit: {
		comProps: {
			type: "primary",
			htmlType: "submit"
		} as ButtonProps
	}
};

export const getRegisterFormItem = ({ loading }: { loading: boolean }) => {
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
		phone: (
			<Form.Item {...formItemConfig.phone.itemProps}>
				<Input {...formItemConfig.phone.comProps} />
			</Form.Item>
		),
		email: (
			<Form.Item {...formItemConfig.email.itemProps}>
				<Input {...formItemConfig.email.comProps} />
			</Form.Item>
		),
		realName: (
			<Form.Item {...formItemConfig.realName.itemProps}>
				<Input {...formItemConfig.realName.comProps} />
			</Form.Item>
		),
		submit: (
			<Form.Item>
				<Button loading={loading} style={{ width: "100%" }} {...formItemConfig.submit.comProps}>
					注册
				</Button>
			</Form.Item>
		)
	};
};
