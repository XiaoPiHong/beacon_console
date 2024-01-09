import { FormProps } from "antd";
import { TFormItemProps } from "./formItem";
import { ColProps } from "antd";

export interface IFormPorps extends FormProps {
	labelWidth?: number | string /** 扩展labelWidth，配置所有选子项的 labelWidth，不需要逐个配置，子项也可单独配置优先与全局 */;
	baseColProps?: ColProps /** 扩展baseColProps，配置所有选子项的 ColProps，不需要逐个配置，子项也可单独配置优先与全局 */;
	items: TFormItemProps[] /** 扩展items表单项 */;
}
