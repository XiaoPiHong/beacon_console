import style from "./index.module.less";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { getRegisterFormItem } from "./indexConfig";
import { useState } from "react";

function Register() {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const onFinish = (values: any) => {
		console.log(values);
		setLoading(true);
		setLoading(false);
		navigate("/login");
	};

	const formItems = getRegisterFormItem({ loading });

	return (
		<div className={style["register"]}>
			<div className={style["register-container"]}>
				<div className={style["register-container-header"]}>
					<div className={style["register-container-header__logo"]}></div>
					<h1>项目管理系统</h1>
					<p>项目无忧，系统成就</p>
					<h2>注册</h2>
				</div>
				<div className={style["register-container-section"]}>
					<div className={style["register-container-section__form"]}>
						<Form name="basic" wrapperCol={{ span: 24 }} onFinish={onFinish} autoComplete="off">
							<>{formItems.username}</>
							<>{formItems.password}</>
							<>{formItems.phone}</>
							<>{formItems.email}</>
							<>{formItems.realName}</>
							<>{formItems.submit}</>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
