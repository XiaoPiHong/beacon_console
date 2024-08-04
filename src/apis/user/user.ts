import { default as http } from "@/utils/request";

/** 用户列表 */
export const getUser = query =>
	http.get({
		url: "/user",
		query
	});

/** 新增用户 */
export const postUser = data =>
	http.post({
		url: "/user",
		data
	});

/** 用户分页查询 */
export const getUserPage = query =>
	http.get({
		url: "/user/page",
		query
	});

/** * 用户详情 */
export const getUserById = id =>
	http.get({
		url: `/user/${id}`
	});

/** 修改用户 */
export const patchUserById = (id, data) =>
	http.patch({
		url: `/user/${id}`,
		data
	});

/** 删除用户 */
export const deleteUserById = id =>
	http.delete({
		url: `/user/${id}`
	});
