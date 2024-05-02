import {  Navigate, Outlet } from "react-router-dom";
// import useLocalStorage from "react-use-localstorage";

export default function PublicRoute() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (isAuthenticated === "true") {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />; 
}