import { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import * as apisAuth from "@/apis/auth";
import * as utilsStorage from "@/utils/storage";
import { useNavigate } from "react-router-dom";

/**
 * 登录表单
 */
export default function () {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	// const [form, setForm] = useState({ data: {} });

	const onFinishForm = (values: any) => {
		setLoading(true);
		apisAuth
			.postAuthSignin(values)
			.then(res => {
				const data = res.data;
				utilsStorage.local.token.set(data.token);
				utilsStorage.local.user.set(data.user);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Form name="basic" wrapperCol={{ span: 24 }} onFinish={onFinishForm}>
			<Form.Item name="username" rules={[{ required: true, message: "请输入用户名称" }]}>
				<Input prefix={<UserOutlined />} placeholder="请输入用户名称" />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
				<Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
			</Form.Item>
			<Form.Item name="remember" valuePropName="checked" initialValue={false}>
				<div style={{ display: "flex", flexFlow: "row nowrap", justifyContent: "space-between", alignItems: "center" }}>
					<Checkbox>记住账号</Checkbox>
					<Button type="link" size="small">
						忘记密码
					</Button>
				</div>
			</Form.Item>
			<Form.Item>
				<Button type="primary" loading={loading} htmlType="submit" style={{ width: "100%" }}>
					登录
				</Button>
			</Form.Item>
		</Form>
	);
}
