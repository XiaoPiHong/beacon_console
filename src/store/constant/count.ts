export const enum ActionTypeEnums {
	INCREMENT = "increment",
	DECREMENT = "decrement"
}

type TActionType = (typeof ActionTypeEnums)[keyof typeof ActionTypeEnums];

export interface ICountAction {
	type: TActionType;
	data: number;
}
