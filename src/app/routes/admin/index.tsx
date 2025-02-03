import { Outlet } from "react-router";
import { AdminSidebar } from "@/components/admin-sidebar.tsx";
import { SidebarInset } from "@/components/ui/sidebar.tsx";

const Admin = () => {
  return (
    <>
      <AdminSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </>
  );
};

export default Admin;
