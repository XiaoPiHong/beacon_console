import { default as http } from "@/utils/request";

/** 注册 */
export const postAuthSignup = data =>
	http.post({
		url: "/auth/signup",
		data
	});

/** 用户名登录 */
export const postSignInByUsername = data =>
	http.post({
		url: "/auth/sign-in-by-username",
		data
	});

/** 获取用户信息 */
export const getUserInfo = () => {
	return http.get({ url: "/auth/get-profile" });
};
