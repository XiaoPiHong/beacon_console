import http from "@/utils/request";

enum Api {
	getUserInfo = "/user/getUserInfo"
}

/**
 * @description 获取用户信息
 */
export const getUserInfo = () => http.get({ url: Api.getUserInfo });
