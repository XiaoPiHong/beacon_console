import { Input } from "antd";

export type ComponentType = "Input";

const componentMap = new Map<ComponentType, React.FC>();

componentMap.set("Input", Input);

export { componentMap };
