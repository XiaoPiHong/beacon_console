import { FormItemProps, ColProps } from "antd";

/**
 * 字符串类型对象
 */
export type Recordable<T> = Record<string, T>;

interface IBaseFormItemProps extends FormItemProps {
	name: string /** 字段名 */;
	label: string /** 标签名 */;
	show?: boolean | Function /** 是否显示（相当于display:none） */;
	ifShow?: boolean | Function /** 是否显示（会新增或删除节点） */;
	required?: boolean | Function /** 是否必填 */;
	colProps?: ColProps /** 栅格布局 */;
	labelWidth: number | string /** 标签宽度 */;
	componentProps?: Recordable<any> /** 组件属性 */;
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
