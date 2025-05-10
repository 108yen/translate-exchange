import { Home } from "app/ui/templates"

export function meta() {
  return [
    { title: "New React Router App" },
    { content: "Welcome to React Router!", name: "description" },
  ]
}

export default function Page() {
  return <Home />
}
