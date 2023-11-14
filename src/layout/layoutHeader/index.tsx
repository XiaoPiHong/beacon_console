import style from "./index.module.less";
import HeaderMenu from "./components/headerMenu";

function LayoutHeader() {
	return (
		<div className={style["header-container"]}>
			<div className={style["header-container-logo"]}></div>
			<div className={style["header-container-menu"]}>
				<HeaderMenu />
			</div>
			<div className={style["header-container-operate"]}></div>
		</div>
	);
}
export default LayoutHeader;
