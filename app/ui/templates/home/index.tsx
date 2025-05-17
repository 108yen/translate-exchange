import { Separator, VStack } from "@yamada-ui/react"
import { ExchangeRateConverter } from "./exchange-rate-converter"
import { Translator } from "./translator"

export function Home() {
  return (
    <VStack m="md" separator={<Separator />}>
      <ExchangeRateConverter />

      <Translator />
    </VStack>
  )
}
