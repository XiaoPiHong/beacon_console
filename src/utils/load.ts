/**
 * @description 下载文件
 * @param url 文件对象的内存地址
 * @param filename 文件全名
 */
export const download = (url: string, filename: string) => {
	const link = document.createElement("a");

	link.href = url;
	link.download = filename;
	link.click();
};
