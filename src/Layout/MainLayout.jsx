import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="app-content">
        <Outlet />
      </main>
    </>
  );
}
