function Error(props: { type: number }) {
	return (
		<div>
			<p>错误页：{props.type}</p>
		</div>
	);
}

export default Error;
