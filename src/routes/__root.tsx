import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import NearProvider from "../contexts/near";

export const Route = createRootRoute({
  component: () => (
    <NearProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Outlet />
      </div>
    </NearProvider>
  ),
});
