import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text, Flex } from "@chakra-ui/react"
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "blue.400";

const LanguageSelector = ({ language, onSelect }) => {
    return (
        <Box ml={2} mb={1} w="100%">
            <Flex alignItems="center">
                <Text mb={1} mr={2} fontSize={'lg'}>Language: </Text>
                <Menu isLazy>
                    <MenuButton as={Button} mb={2}>
                        {language}
                    </MenuButton>
                    <MenuList bg="#110c1b">
                        {languages.map(([lang, version]) => (
                            <MenuItem key={lang}
                                color={
                                    lang === language ? ACTIVE_COLOR : ""
                                }
                                bg={
                                    lang === language ? "gray.900" : "transparent"
                                }
                                _hover={{
                                    color: ACTIVE_COLOR,
                                    bg: "gray.900"
                                }}
                                onClick={() => onSelect(lang)}
                            >{lang}
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
    )
}
export default LanguageSelector;