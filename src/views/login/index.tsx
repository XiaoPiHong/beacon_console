import style from "./index.module.less";
import { Tabs } from "antd";
import { useTags } from "./hooks";

const Login = () => {
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
};

export default Login;
