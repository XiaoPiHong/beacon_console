import { connect } from "react-redux";
import { IStoreState } from "@/store/types";
import { setUserInfo } from "@/store/actions/user";
import { Button } from "antd";

interface ILoginProps {
	user: IStoreState["user"];
	setUserInfo: (user: IStoreState["user"]["userInfo"]) => void;
}

function Login(props: ILoginProps) {
	const onClickSetUserInfo = () => {
		props.setUserInfo({ name: "用户名", password: "xxx" });
	};
	const onClickClearUserInfo = () => {
		props.setUserInfo(null);
	};
	return (
		<div>
			<p>用户名：{props.user.userInfo?.name}</p>
			<p>用户名密码：{props.user.userInfo?.password}</p>
			<Button onClick={onClickSetUserInfo}>设置用户信息</Button>
			<Button onClick={onClickClearUserInfo}>清除用户信息</Button>
		</div>
	);
}

//使用connect()()创建并暴露容器组件
export default connect(
	(state: IStoreState) => ({
		user: state.user
	}),
	{ setUserInfo }
)(Login);
