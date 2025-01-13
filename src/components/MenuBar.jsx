import { Flex, Box, Button, HStack, useToast } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/AuthContext";

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
      bgGradient="linear(to-r, #2a7a69, #316fa8)"
      color="white"
      boxShadow="0px 2px 10px rgba(0, 0, 0, 0.1)"
      position="fixed"
      zIndex="1000"
      top="0"
      left="0"
      width="100%"
    >
      <Box w="auto">
        <Link to="/">
          <Button
            alt="Logo"
            variant="ghost"
            color="white"
            fontWeight="bold"
            _hover={{ color: "yellow.300" }}
          >
            Code-Series
          </Button>
        </Link>
      </Box>

      {isLoggedIn && (
        <Flex gap={3} align="center" ml={4}>
          <Link to="/courses">
            <Button
              variant="ghost"
              color={location.pathname === "/courses" ? "yellow.300" : "whiteAlpha.800"}
              fontSize="sm"
              _hover={{ color: "yellow.300" }}
            >
              Courses
            </Button>
          </Link>
          <Link to="/lessons">
            <Button
              variant="ghost"
              color={location.pathname === "/lessons" ? "yellow.300" : "whiteAlpha.800"}
              fontSize="sm"
              _hover={{ color: "yellow.300" }}
            >
              Lessons
            </Button>
          </Link>
          <Link to="/assignments">
            <Button
              variant="ghost"
              color={location.pathname === "/assignments" ? "yellow.300" : "whiteAlpha.800"}
              fontSize="sm"
              _hover={{ color: "yellow.300" }}
            >
              Assignments
            </Button>
          </Link>
          <Link to="/user-profile">
            <Button
              variant="ghost"
              color={location.pathname === "/user-profile" ? "yellow.300" : "whiteAlpha.800"}
              fontSize="sm"
              _hover={{ color: "yellow.300" }}
            >
              User Profile
            </Button>
          </Link>
          <Link to="/ranking">
            <Button
              variant="ghost"
              color={location.pathname === "/ranking" ? "yellow.300" : "whiteAlpha.800"}
              fontSize="sm"
              _hover={{ color: "yellow.300" }}
            >
              Ranking
            </Button>
          </Link>
        </Flex>
      )}
      <HStack ml="auto" spacing={4}>
        {isLoggedIn ? (
          <Button
            onClick={handleLogout}
            variant="ghost"
            color="whiteAlpha.800"
            _hover={{ color: "yellow.300" }}
          >
            Log out
          </Button>
        ) : (
          <Link to="/auth">
            <Button
              variant="ghost"
              color={location.pathname === "/auth" ? "yellow.300" : "whiteAlpha.800"}
              _hover={{ color: "yellow.300" }}
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
