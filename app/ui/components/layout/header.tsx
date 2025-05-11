import { SettingsIcon } from "@yamada-ui/lucide"
import {
  Drawer,
  DrawerBody,
  Flex,
  IconButton,
  useDisclosure,
} from "@yamada-ui/react"

function HeaderMenu() {
  const { onClose, onOpen, open } = useDisclosure()

  return (
    <>
      <IconButton icon={<SettingsIcon />} onClick={onOpen} variant="primary" />

      <Drawer onClose={onClose} open={open} placement="bottom">
        <DrawerBody>設定</DrawerBody>
      </Drawer>
    </>
  )
}

export function Header() {
  return (
    <Flex
      as="header"
      justifyContent="flex-end"
      position="sticky"
      px="md"
      top={0}
      w="full"
      zIndex="guldo"
    >
      <HeaderMenu />
    </Flex>
  )
}
