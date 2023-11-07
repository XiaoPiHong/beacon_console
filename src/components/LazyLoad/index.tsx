// LazyLoad.tsx
import { Suspense, lazy } from "react";

function LazyLoad(url: string) {
	const Module = lazy(() => {
		return new Promise(resolve => {
			import(/* @vite-ignore */ "../views/" + url)
				.then(res => resolve(res))
				.catch(err => {
					throw new Error(err);
				});
		});
	});

	return (
		<Suspense>
			<Module />
		</Suspense>
	);
}

export default LazyLoad;
