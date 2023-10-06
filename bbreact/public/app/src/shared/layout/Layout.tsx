import Header from "@component/Header";
import Sidebar from "@component/Sidebar";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

interface LayoutProps {}

export default function Layout(props: React.PropsWithChildren<LayoutProps>) {
  const signOut = () => {};

  return (
    <div>
      <Header signOut={signOut} />
      <Sidebar signOut={signOut} />
      <main className="p-4 md:ml-64 h-auto pt-20">{props.children}</main>
    </div>
  );
}
