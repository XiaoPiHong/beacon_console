import { message } from "antd";
import qs from "qs";
import _ from "lodash-es";
import * as loadUtil from "@/utils/load";
import * as utilsStorage from "@/utils/storage";

const { VITE_BASE_API_URL } = import.meta.env;

/**
 * 请求方式 Enum
 */
export enum MethodEnum {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
	HEAD = "HEAD",
	PATCH = "PATCH"
}

/**
 * 响应体的内容类型 Enum
 */
export enum ContentTypeEnum {
	APPLICATION_JSON = "application/json", // 默认
	APPLICATION_X_WWW_FORM_URLENCODED = "application/x-www-form-urlencoded",
	MULTIPART_FORM_DATA = "multipart/form-data",
	APPLICATION_VND_MS_EXCEL = "application/vnd.ms-excel"
}

/**
 * 请求选项接口
 */
interface IRequestOptions {
	/** 请求路径 */
	url: string;
	/** 请求方式 */
	method: MethodEnum;
	/** 查询字符串参数 */
	query?: { [key: string]: any };
	/** 请求头 */
	headers?: { [key: string]: any };
	/** 请求载荷 */
	data?: { [key: string]: any };
}

/**
 * 请求函数
 * @param options 请求选项
 */
function request(options: IRequestOptions) {
	let { url, method, query, headers = {}, data = {} } = options;
	const accessToken = utilsStorage.local.accessToken.get();
	let body;

	headers = new Headers(
		_.merge(
			{
				"Content-Type": ContentTypeEnum.APPLICATION_JSON,
				authorization: accessToken ? `Bearer ${accessToken}` : ""
			},
			headers
		)
	);

	switch (headers.get("Content-Type")) {
		case ContentTypeEnum.APPLICATION_JSON:
			/** GET和HEAD没有请求体 */
			if ([MethodEnum.POST, MethodEnum.PUT, MethodEnum.DELETE].includes(method)) {
				body = JSON.stringify(data);
			}
			break;
		case ContentTypeEnum.MULTIPART_FORM_DATA:
			if ([MethodEnum.POST, MethodEnum.PUT, MethodEnum.DELETE].includes(method)) {
				headers.delete("Content-Type"); // 删除使浏览器自动配置才能上传成功
				body = qs.stringify(data); // 自动将 object 转 FormData
			}
			break;
	}
	return fetch(`${VITE_BASE_API_URL}${url}${query ? `?${qs.stringify(query)}` : ""}`, {
		method,
		headers,
		body,
		credentials: "include"
	})
		.then(res => {
			if (res.ok) {
				const contentType = res.headers.get("content-type");

				if (!contentType) {
					return Promise.reject(new Error("响应头未找到 Content-Type 字段"));
				}

				if (contentType.includes(ContentTypeEnum.APPLICATION_JSON)) {
					return res.json().then(body => {
						/** 客户端根据不同 code 的含义，执行相应的响应预处理 */
						switch (body.code) {
							/** 成功 */
							case 200:
								return body;
							case 400:
								return Promise.reject(new Error(`code：${body.code}，message：${body.message}`));
							/** 未认证 */
							case 401: {
								utilsStorage.local.accessToken.remove();
								utilsStorage.local.refreshToken.remove();
								window.location.href = "/login";
								return;
							}
							default:
								return Promise.reject(new Error(`客户端不知道如何处理 code: ${body.code}`));
						}
					});
				} else if (contentType.includes(ContentTypeEnum.APPLICATION_VND_MS_EXCEL)) {
					return res.blob().then(blob => {
						const url = window.URL.createObjectURL(blob);

						loadUtil.download(
							url,
							decodeURIComponent(res.headers.get("content-disposition")?.split("attachment;filename=")[1] ?? `${Date.now()}.xlsx`)
						);
						window.URL.revokeObjectURL(url);
					});
				}

				return Promise.reject(new Error(`客户端不知道如何处理 Content-Type: ${contentType}`));
			}

			return Promise.reject(new Error("未知错误"));
		})
		.catch(error => {
			message.error(error.message);
			return Promise.reject(error);
		});
}

/**
 * 创建请求函数，通过指定的请求方式
 * @param method 请求方式
 */
const createRequest = (method: MethodEnum) => {
	return (options: Omit<IRequestOptions, "method">) =>
		request({
			...options,
			method
		});
};

export default {
	get: createRequest(MethodEnum.GET),
	head: createRequest(MethodEnum.HEAD),
	put: createRequest(MethodEnum.PUT),
	post: createRequest(MethodEnum.POST),
	delete: createRequest(MethodEnum.DELETE),
	patch: createRequest(MethodEnum.PATCH)
};
