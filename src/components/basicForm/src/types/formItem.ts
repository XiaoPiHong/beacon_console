import { FormItemProps } from "antd";

interface IBaseFormItemProps extends FormItemProps {
	name: string /** 字段名 */;
	label: string /** 标签名 */;
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
