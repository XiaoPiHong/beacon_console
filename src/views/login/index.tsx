import { connect } from "react-redux";
import { IStoreState } from "@/store/types";
import { setUserInfo, TUserActionFn, login, loginOut } from "@/store/actions/user";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

interface ILoginProps {
	user: IStoreState["user"];
	setUserInfo: TUserActionFn;
	login: (args?: any) => Promise<any>;
	loginOut: (args?: any) => Promise<any>;
}

function Login(props: ILoginProps) {
	const navigate = useNavigate();

	// const onClickSetUserInfo = () => {
	// 	props.setUserInfo({ name: "用户名", password: "xxx" });
	// };

	const login = async () => {
		await props.login();

		console.log("同步成功");
	};

	const test = () => {
		navigate("/system/role/2/3");
	};

	const test1 = () => {
		navigate("/system/department");
	};

	const test2 = () => {
		navigate("/home");
	};

	return (
		<div>
			<p>用户名：{props.user.userInfo?.name}</p>
			<p>用户名密码：{props.user.userInfo?.password}</p>
			<Button onClick={login}>设置用户信息</Button>
			<Button onClick={test}>测试角色</Button>
			<Button onClick={test1}>测试部门</Button>
			<Button onClick={test2}>测试主页</Button>
			<Button onClick={props.loginOut}>清除用户信息</Button>
		</div>
	);
}

//使用connect()()创建并暴露容器组件
export default connect(
	(state: IStoreState) => ({
		user: state.user
	}),
	{ login, setUserInfo, loginOut }
)(Login);
