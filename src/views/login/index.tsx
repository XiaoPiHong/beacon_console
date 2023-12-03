import { connect } from "react-redux";
import { IStoreState } from "@/store/types";
import { login } from "@/store/actions/user";
import style from "./index.module.less";
import { Tabs } from "antd";
import { useTags } from "./hooks/";

interface ILoginProps {
	user: IStoreState["user"];
	login: (args?: any) => Promise<any>;
}

function Login(props: ILoginProps) {
	console.log(props);
	const { tabsActiveKey, tabsList, onChangeTabs } = useTags();

	return (
		<div className={style["page"]}>
			<div className={style["login"]}>
				<div className={style["login__header"]}>
					<div className={style["login__header-title"]}>项目管理系统</div>
					<div className={style["login__header-description"]}>项目成功，系统成就</div>
				</div>

				<div className={style["login__body"]}>
					<Tabs defaultActiveKey={tabsActiveKey} items={tabsList} onChange={onChangeTabs} />
				</div>
			</div>
		</div>
	);
}

// 使用 connect()() 创建并暴露容器组件
export default connect(
	(state: IStoreState) => ({
		user: state.user
	}),
	{ login }
)(Login);
