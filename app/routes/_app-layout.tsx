import { Center } from "@yamada-ui/react"
import { Outlet } from "react-router"

export default function Layout() {
  return (
    <Center as="main">
      <Outlet />
    </Center>
  )
}
