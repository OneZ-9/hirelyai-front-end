import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div>
      <div className="flex justify-end items-center gap-x-4 py-4">
        <Link to="/admin/jobs">Job Posts</Link>
        <Button asChild>
          <Link to="/admin/job/create">Post A Job</Link>
        </Button>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminLayout;
