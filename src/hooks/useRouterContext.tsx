import { createContext, useContext } from "react";
import { IMeta } from "../hooks/usePermissionRoutes";

const RouterContext = createContext<{
	pageMetas: IMeta[];
}>({
	pageMetas: []
});

export const RouterProvider = ({
	children,
	pageMetas
}: {
	children: React.ReactElement<any, string | React.JSXElementConstructor<any>> | null;
	pageMetas: IMeta[];
}) => {
	return <RouterContext.Provider value={{ pageMetas }}>{children}</RouterContext.Provider>;
};

export const useRouter = () => useContext(RouterContext);
