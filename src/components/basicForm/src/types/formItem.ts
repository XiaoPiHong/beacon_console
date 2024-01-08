import { FormItemProps } from "antd";
import { ColProps } from "antd";

interface IBaseFormItemProps extends FormItemProps {
	name: string /** 字段名 */;
	label: string /** 标签名 */;
	show?: boolean | Function /** 是否显示（相当于display:none） */;
	ifShow?: boolean | Function /** 是否显示（会新增或删除节点） */;
	wrapperCol?: ColProps /** 栅格布局 */;
}

/** render props */
interface IRenderFormItemProps extends IBaseFormItemProps {
	render: () => React.ReactNode /** 自定义渲染组件 */;
}
/** component props */
interface IComponentFormItemProps extends IBaseFormItemProps {
	component: string /** 映射组件 */;
}

export type TFormItemProps = IRenderFormItemProps | IComponentFormItemProps;
