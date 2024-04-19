import style from "./index.module.less";
import HeaderMenu from "./components/headerMenu";

const LayoutHeader = () => {
	return (
		<div className={style["header-container"]}>
			<div className={style["header-container-logo"]}></div>
			<div className={style["header-container-menu"]}>
				<HeaderMenu />
			</div>
			<div className={style["header-container-setting"]}></div>
		</div>
	);
};
export default LayoutHeader;
