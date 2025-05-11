import type { PropsWithChildren } from "react"
import { Center } from "@yamada-ui/react"
import { Header } from "../components/layout"

interface AppLayoutProps extends PropsWithChildren {}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header />

      <Center as="main">{children}</Center>
    </>
  )
}
