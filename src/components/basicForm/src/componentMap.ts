import { Input, InputNumber } from "antd";

export type ComponentType = "Input" | "InputNumber";

const componentMap = new Map<ComponentType, React.FC>();

componentMap.set("Input", Input);
componentMap.set("InputNumber", InputNumber);

export { componentMap };
