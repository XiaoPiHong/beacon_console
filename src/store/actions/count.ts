/* 
	该文件专门为Count组件生成action对象
*/
import { Dispatch } from "redux";
import { ActionTypeEnums } from "../constant/count";

//同步action，就是指action的值为Object类型的一般对象
export const increment = (data: number) => ({ type: ActionTypeEnums.INCREMENT, data });
export const decrement = (data: number) => ({ type: ActionTypeEnums.DECREMENT, data });

//异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的。
export const incrementAsync = (data: number, time: number) => {
	return (dispatch: Dispatch) => {
		setTimeout(() => {
			dispatch(increment(data));
		}, time);
	};
};
