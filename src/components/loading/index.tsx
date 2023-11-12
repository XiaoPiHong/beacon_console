import { Spin } from "antd";
import style from "./index.module.less";

function Loading() {
	return (
		<div className={style["loading-container"]}>
			<Spin tip="玩命加载中">
				{/**
				 * 加<></>使Spin作为包裹组件使用
				 */}
				<></>
			</Spin>
		</div>
	);
}

export default Loading;
