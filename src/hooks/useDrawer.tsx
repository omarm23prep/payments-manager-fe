import { useDisclosure } from "@chakra-ui/react";

export const useDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return { isOpen, onOpen, onClose };
}
