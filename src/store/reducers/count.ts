/* 
	1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
	2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/
import { ActionTypeEnums, ICountAction } from "../constant/count";

// 初始化状态
const countState = {
	count: 0
};

export default function countReducer(preState = countState, action: ICountAction) {
	//从action对象中获取：type、data
	const { type, data } = action;
	//根据type决定如何加工数据
	switch (type) {
		case ActionTypeEnums.INCREMENT: //如果是加
			return { ...preState, count: preState.count + data };
		case ActionTypeEnums.DECREMENT: //若果是减
			return { ...preState, count: preState.count + data };
		default:
			return preState;
	}
}
