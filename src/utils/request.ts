import { message } from "antd";
import qs from "qs";
import * as loadUtil from "@/utils/load";
import { deepMerge } from ".";

const { VITE_BASE_URL } = import.meta.env;

/**
 * 方式 Enum
 */
export enum MethodEnum {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
	HEAD = "HEAD"
}

/**
 * 内容类型 Enum
 */
export enum ContentTypeEnum {
	APPLICATION_JSON = "application/json", // 默认
	APPLICATION_X_WWW_FORM_URLENCODED = "application/x-www-form-urlencoded",
	MULTIPART_FORM_DATA = "multipart/form-data",
	APPLICATION_VND_MS_EXCEL = "application/vnd.ms-excel"
}

interface IRequestOptions {
	/** 请求路径 */
	url: string;
	/** 请求方式 */
	method: MethodEnum;
	/** params 请求参数 */
	params?: { [key: string]: any };
	/** body 传参 */
	body?: { [key: string]: any };
	/** headers 请求头 */
	headers?: { [key: string]: any };
}

function request(options: IRequestOptions) {
	const { url, method, params = {} } = options;
	let { body = {} }: any = options;
	let hrefSearch = "";

	const headers = new Headers(
		deepMerge(
			{
				"Content-Type": ContentTypeEnum.APPLICATION_JSON,
				authorization: localStorage.getItem("token")
			},
			options.headers || {}
		)
	);

	switch (method) {
		case MethodEnum.GET:
		case MethodEnum.HEAD:
			hrefSearch = qs.stringify(params);
			body = undefined;
			break;
		case MethodEnum.PUT:
		case MethodEnum.POST:
			{
				switch (headers.get("Content-Type")) {
					case ContentTypeEnum.APPLICATION_JSON:
						body = JSON.stringify(params);
						break;
					case ContentTypeEnum.MULTIPART_FORM_DATA:
						headers.delete("Content-Type"); // 删除使浏览器自动配置才能上传成功
						body = qs.stringify(options.body); // 自动将object转FormData
						break;
				}
			}
			break;
	}

	return fetch(`${VITE_BASE_URL}${url}?${hrefSearch}`, {
		method,
		body,
		headers,
		credentials: "include"
	})
		.then(response => {
			if (response.ok) {
				const contentType = response.headers.get("content-type");
				switch (true) {
					case contentType?.includes(ContentTypeEnum.APPLICATION_JSON): {
						const getBodyPromise = response.json();
						return getBodyPromise.then(body => {
							switch (body.code) {
								case 200:
									return body;
								/** 目前先定义200，后续根据后端项目添加 */
							}
						});
					}
					case contentType?.includes(ContentTypeEnum.APPLICATION_VND_MS_EXCEL): {
						return response.blob().then(blob => {
							const url = window.URL.createObjectURL(blob);

							loadUtil.download(
								url,
								decodeURIComponent(
									response.headers.get("content-disposition")?.split("attachment;filename=")[1] ?? `${Date.now()}.xlsx`
								)
							);
							window.URL.revokeObjectURL(url);
						});
					}
					default:
						return Promise.reject(new Error("请求失败"));
				}
			} else {
				return Promise.reject(new Error("请求失败"));
			}
		})
		.catch(error => {
			message.error(error.message);
			return Promise.reject(error);
		});
}

type IHttpCommonProps = {
	url: string;
	headers?: IRequestOptions["headers"];
};
const http = {
	get: ({ url, params, headers }: IHttpCommonProps & { params?: IRequestOptions["params"] }) => {
		request({
			url,
			method: MethodEnum.GET,
			params,
			headers
		});
	},
	head: ({ url, params, headers }: IHttpCommonProps & { params?: IRequestOptions["params"] }) => {
		request({
			url,
			method: MethodEnum.HEAD,
			params,
			headers
		});
	},
	put: ({ url, body, headers }: IHttpCommonProps & { body?: IRequestOptions["body"] }) => {
		request({
			url,
			method: MethodEnum.PUT,
			body,
			headers
		});
	},
	post: ({ url, body, headers }: IHttpCommonProps & { body?: IRequestOptions["body"] }) => {
		request({
			url,
			method: MethodEnum.POST,
			body,
			headers
		});
	},
	delete: ({ url, body, headers }: IHttpCommonProps & { body?: IRequestOptions["body"] }) => {
		request({
			url,
			method: MethodEnum.DELETE,
			body,
			headers
		});
	}
};
export default http;
