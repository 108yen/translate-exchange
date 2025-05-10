import { Center, Code, Heading, Text, UIProvider } from "@yamada-ui/react"
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router"
import type { Route } from "./+types/root"

export const links: Route.LinksFunction = () => [
  { href: "https://fonts.googleapis.com", rel: "preconnect" },
  {
    crossOrigin: "anonymous",
    href: "https://fonts.gstatic.com",
    rel: "preconnect",
  },
  {
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    rel: "stylesheet",
  },
]

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <Center as="main" flexDirection="column" h="100vh">
      <Heading as="h1" size="4xl">
        {message}
      </Heading>

      <Text>{details}</Text>
      {stack && (
        <pre>
          <Code>{stack}</Code>
        </pre>
      )}
    </Center>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        <UIProvider>{children}</UIProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
