import { Flex, Box, Button, HStack, useToast } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/AuthContext"; // Import useAuth

function MenuBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();

    toast({
      title: "Logout",
      description: "You have been logged out successfully.",
      status: "info",
      duration: 6000,
      isClosable: true,
    });

    navigate("/auth");
  };

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
      <Flex gap={3} align="center">
        <Box w="auto" mr="auto">
          <Link to="/">
            <Button alt="Logo" variant="ghost" colorScheme="grey" _hover={{ background: "none", color: "inherit" }}>
              Code-Series
            </Button>
          </Link>
        </Box>
        <Link to="/courses">
          <Button
            variant="ghost"
            color={location.pathname === "/courses" ? "white" : "whiteAlpha.700"}
            fontSize="sm"
          >
            Courses
          </Button>
        </Link>
        <Link to="/lessons">
          <Button
            variant="ghost"
            color={location.pathname === "/lessons" ? "white" : "whiteAlpha.700"}
            fontSize="sm"
          >
            Lessons
          </Button>
        </Link>
        <Link to="/assignments">
          <Button
            variant="ghost"
            color={location.pathname === "/assignments" ? "white" : "whiteAlpha.700"}
            fontSize="sm"
          >
            Assignments
          </Button>
        </Link>
        {/* Przyciski widoczne tylko dla zalogowanych użytkowników */}
        {isLoggedIn && (
          <Link to="/user-profile">
            <Button
              variant="ghost"
              color={location.pathname === "/user-profile" ? "white" : "whiteAlpha.700"}
              fontSize="sm"
            >
              User Profile
            </Button>
          </Link>
        )}
      </Flex>
      <HStack ml="auto" spacing={4}>
        {isLoggedIn ? (
          <Button onClick={handleLogout} variant="ghost" color="whiteAlpha.700">
            Log out
          </Button>
        ) : (
          <Link to="/auth">
            <Button
              variant="ghost"
              color={location.pathname === "/auth" ? "white" : "whiteAlpha.700"}
            >
              Log in
            </Button>
          </Link>
        )}
      </HStack>
    </Flex>
  );
}

export default MenuBar;

