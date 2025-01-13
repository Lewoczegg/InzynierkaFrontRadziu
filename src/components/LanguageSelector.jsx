import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text, Flex } from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "teal.600";

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <Box ml={2} mb={1} w="100%">
      <Flex alignItems="center">
        <Text mb={1} mr={2} fontSize="lg" color="gray.800">
          Language:
        </Text>
        <Menu isLazy>
          <MenuButton
            as={Button}
            mb={2}
            bgGradient="linear(to-r,#2a7a69, #316fa8)"
            color="white"
            _hover={{
              bgGradient: "linear(to-r, #20775c, #4da08f)",
            }}
            _active={{
              bgGradient: "linear(to-r, #1f6c55, #479d89)",
            }}
          >
            {language}
          </MenuButton>
          <MenuList bgGradient="linear(to-b, #f5f7fa, #e9eff5)" border="none" boxShadow="lg">
            {languages.map(([lang, version]) => (
              <MenuItem
                key={lang}
                color={lang === language ? ACTIVE_COLOR : "gray.700"}
                bg={lang === language ? "teal.100" : "transparent"}
                _hover={{
                  color: ACTIVE_COLOR,
                  bg: "teal.50",
                }}
                borderRadius="md"
                onClick={() => onSelect(lang)}
              >
                {lang}
                &nbsp;
                <Text as="span" color="gray.600" fontSize="sm">
                  ({version})
                </Text>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default LanguageSelector;
