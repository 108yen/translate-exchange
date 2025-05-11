import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
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
      <Card colorScheme="teal" variant="subtle">
        <CardBody>
          <List>
            <ListItem>
              <HStack
                border="1px solid"
                borderColor="black"
                borderRadius="md"
                h="6xs"
                separator={<Separator h="7xs" />}
              >
                <Input
                  _active={{ borderColor: "none" }}
                  _focusVisible={{ borderColor: "none" }}
                  _hover={{ borderColor: "none" }}
                  borderColor="transparent"
                  value="1"
                />

                <Input
                  _active={{ borderColor: "none" }}
                  _focusVisible={{ borderColor: "none" }}
                  _hover={{ borderColor: "none" }}
                  borderColor="transparent"
                  textAlign="end"
                  value="USドル"
                />
              </HStack>
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
