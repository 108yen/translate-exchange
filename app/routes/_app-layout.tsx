import { AppLayout } from "app/ui/layouts"
import { Outlet } from "react-router"

export default function Layout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
