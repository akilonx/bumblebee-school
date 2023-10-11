import { Loader } from "@aws-amplify/ui-react";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface LayoutProps {}

export default function Layout(props: React.PropsWithChildren<LayoutProps>) {
  const signOut = () => {};

  return (
    <div className="min-h-screen flex flex-col h-screen">
      <Topbar signOut={signOut} />
      <div className="flex-1 flex flex-row overflow-y-hidden">
        <Sidebar signOut={signOut} />
        <main className="flex-1 bg-gray-100 overflow-y-auto p-5">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </main>
        {/* 
        <aside className="sm:w-32 bg-yellow-100 overflow-y-auto">
          Right Sidebar
        </aside> */}
      </div>

      {/* <footer className="bg-gray-100">Footer</footer> */}
    </div>
  );
}
