import { connect } from "react-redux";
import { IStoreState } from "@/store/types";
import { setUserInfo, TUserActionFn, login, loginOut } from "@/store/actions/user";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

interface ILoginProps {
	user: IStoreState["user"];
	setUserInfo: TUserActionFn;
	login: (args: any) => void;
	loginOut: (args: any) => void;
}

function Login(props: ILoginProps) {
	const navigate = useNavigate();

	// const onClickSetUserInfo = () => {
	// 	props.setUserInfo({ name: "用户名", password: "xxx" });
	// };

	const test = () => {
		navigate("/system/role");
	};

	const test1 = () => {
		navigate("/system/department");
	};

	return (
		<div>
			<p>用户名：{props.user.userInfo?.name}</p>
			<p>用户名密码：{props.user.userInfo?.password}</p>
			<Button onClick={props.login}>设置用户信息</Button>
			<Button onClick={test}>测试角色</Button>
			<Button onClick={test1}>测试部门</Button>
			<Button onClick={props.loginOut}>清除用户信息</Button>
		</div>
	);
}

//使用connect()()创建并暴露容器组件
export default connect(
	(state: IStoreState) => ({
		user: state.user
	}),
	{ setUserInfo, login, loginOut }
)(Login);
