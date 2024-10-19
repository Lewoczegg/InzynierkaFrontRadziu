import { Flex, Box, Button, Link } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

function MenuBar() {
  const location = useLocation(); // To get the current path

  return (
    <Flex
      as="nav"
      align="center"
      justify="start"
      padding="0.5rem"
      bg="gray.600"
      color="white"
      boxShadow="md"
      borderRadius="md"
      position="fixed" 
      zIndex="1000"
      top="0" 
      left="0" 
      width="100%" 
      
      
    >
      <Box w={'100%'} >
        <Link href="/">
          <Button alt="Logo" variant="ghost" colorScheme="grey" _hover={{ background: "none", color: "inherit" }}>
            Code-Series
          </Button>
        </Link>
      </Box>

      <Flex gap={3}>
        <Link href="/lessons">
          <Button
            variant="ghost"
            color={location.pathname === "/lessons" ? "white" : "whiteAlpha.700"}
            fontSize="sm"
          >
            Lessons
          </Button>
        </Link>
        <Link href="/courses">
          <Button
            variant="ghost"
            color={location.pathname === "/courses" ? "white" : "whiteAlpha.700"}
            fontSize="sm"
          >
            Courses
          </Button>
        </Link>
        <Link href="/assignments">
          <Button
            variant="ghost"
            color={location.pathname === "/assignments" ? "white" : "whiteAlpha.700"}
            fontSize="sm"
          >
            Assignments
          </Button>
        </Link>
      </Flex>
      <Box ml="auto">
      <Link href="/login">
          <Button
            variant="ghost"
            color={location.pathname === "/login" ? "white" : "whiteAlpha.700"}
          >
            Log in
          </Button>
      </Link>
      </Box>
    </Flex>
  );
}

export default MenuBar;
