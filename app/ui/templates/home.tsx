import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
  List,
  ListItem,
  Separator,
  Textarea,
  VStack,
} from "@yamada-ui/react"

export function Home() {
  return (
    <VStack m="md" separator={<Separator />}>
      <Card colorScheme="gray" variant="subtle">
        <CardBody>
          <List>
            <ListItem>
              <Input value="1 USドル" />
            </ListItem>
            <ListItem>
              <Input value="1 円" />
            </ListItem>
          </List>
        </CardBody>
      </Card>

      <Card variant="subtle">
        <CardHeader>
          <Heading size="md">英語 → 日本語</Heading>
        </CardHeader>

        <CardBody>
          <Textarea placeholder="Hello world!" />
        </CardBody>
      </Card>
    </VStack>
  )
}
