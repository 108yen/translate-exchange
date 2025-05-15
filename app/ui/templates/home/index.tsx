import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Separator,
  Textarea,
  VStack,
} from "@yamada-ui/react"
import { ExchangeRateConverter } from "./exchange-rate-converter"

export function Home() {
  return (
    <VStack m="md" separator={<Separator />}>
      <ExchangeRateConverter />

      <Card variant="subtle">
        <CardHeader>
          <Heading size="md">英語 → 日本語</Heading>
        </CardHeader>

        <CardBody>
          <Textarea
            _active={{ borderColor: "none" }}
            _focusVisible={{ borderColor: "none" }}
            _hover={{ borderColor: "none" }}
            borderColor="transparent"
            p={0}
            placeholder="Hello world!"
          />
        </CardBody>
      </Card>
    </VStack>
  )
}
