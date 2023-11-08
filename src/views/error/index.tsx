const errorMap = {
	403: "抱歉，你无权访问该页面",
	404: "页面不存在"
};

function Error(props: { type: keyof typeof errorMap }) {
	return (
		<div>
			<p>错误页：{errorMap[props.type]}</p>
		</div>
	);
}

export default Error;
