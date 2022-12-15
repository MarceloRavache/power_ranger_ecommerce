import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { FC, useRef } from "react";
import { AiOutlineMenu } from "react-icons/ai";

interface ItemProps {
  name: string;
}

const Item: FC<ItemProps> = ({ name }) => {
  return (
    <Box
      h={"100%"}
      paddingX={5}
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      cursor={"pointer"}
      _hover={{
        color: "blue.500",
      }}
    >
      <Text fontSize={14}>{name}</Text>
    </Box>
  );
};

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<FocusableElement> | undefined;
  itensMenu: string[];
}

const DrawerMenu: FC<DrawerMenuProps> = ({
  btnRef,
  isOpen,
  onClose,
  itensMenu,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>
        <DrawerBody>
          <Flex flexDirection={"column"} gap={5}>
            {itensMenu.map((item) => (
              <Text>{item}</Text>
            ))}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const itemsMenu = [
  "Sobre",
  "Soluções",
  "Integrações",
  "Materiais",
  "Contato",
  "Trabalhe conosco",
];

export const Menu: FC = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnDrawerRef = useRef<React.RefObject<FocusableElement> | undefined>();

  return (
    <Flex w={"100%"} h={"5.2rem"} display="flex" justifyContent={"center"}>
      <DrawerMenu
        btnRef={btnDrawerRef}
        isOpen={isOpen}
        onClose={onClose}
        itensMenu={itemsMenu}
      />
      <Box
        w="100%"
        maxW={isLargerThan800 ? (isLargerThan1200 ? 1200 : 900) : "100%"}
        p={isLargerThan800 ? 0 : 5}
        h={"100%"}
      >
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          w="100%"
          h={"100%"}
        >
          <Image
            w={isLargerThan800 ? "10rem" : "6rem"}
            src="https://static.wikia.nocookie.net/powerrangers/images/f/f0/Power_Rangers_SPD_S13_Logo_2005.png"
          />
          {isLargerThan800 ? (
            <HStack spacing={1}>
              {itemsMenu.map((item) => (
                <Item name={item} />
              ))}
              <Box
                as="button"
                bg="#0795FF"
                px={12}
                py={2}
                color={"white"}
                borderRadius={5}
                fontWeight={"300"}
                _hover={{
                  bg: "#004482",
                }}
              >
                Blog {">"}
              </Box>
            </HStack>
          ) : (
            <Box>
              <AiOutlineMenu size={30} onClick={onOpen} />
            </Box>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};
