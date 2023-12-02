import { default as http } from "@/utils/request";

/** 注册 */
export const postAuthSignup = data =>
	http.post({
		url: "/auth/signup",
		data
	});

/** 登录 */
export const postAuthSignin = data =>
	http.post({
		url: "/auth/signin",
		data
	});
