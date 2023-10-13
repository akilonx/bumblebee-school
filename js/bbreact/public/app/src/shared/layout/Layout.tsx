import { Loader } from "@aws-amplify/ui-react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
	return (
		<div className="min-h-screen flex flex-col h-screen">
			<Topbar />
			<div className="flex-1 flex flex-row overflow-y-hidden">
				<Sidebar />
				<main className="flex-1 bg-gray-100 overflow-y-auto p-5">
					<Suspense fallback={<Loader />}>
						<Outlet />
					</Suspense>
				</main>
			</div>
		</div>
	);
}
