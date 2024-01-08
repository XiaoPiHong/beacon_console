import { FormProps } from "antd";
import { TFormItemProps } from "./formItem";

export interface IFormPorps extends FormProps {
	items: TFormItemProps[] /** 扩展items属性 */;
}
