import React, { useState } from "react";
import { Box, Input, Button, Text, VStack, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { loginUser } from "../api";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      setError(null);
      setValidationErrors({});

      const response = await loginUser(username, password);

      login(response.token);

      toast({
        title: "Login",
        description: "Login successful!",
        status: "success",
        duration: 6000,
        isClosable: true,
      });

      navigate("/");
    } catch (error) {

      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <Box
      w="100%"
      maxW="lg"
      mx="auto"
      p={8}
      borderRadius="lg"
      bgGradient="linear(to-r,rgb(101, 190, 171),rgb(100, 241, 211))"
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
    >
      <form onSubmit={handleLogin}>
        <VStack spacing={6}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            color="gray.800"
            mb={4}
          >
            Login
          </Text>

          <FormControl id="username" isInvalid={validationErrors.username}>
            <FormLabel color="gray.700">Username</FormLabel>
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              bg="white"
              borderColor="gray.300"
              borderRadius="md"
              _hover={{ borderColor: "teal.400" }}
              _focus={{ borderColor: "teal.400", boxShadow: "0px 0px 4px teal" }}
            />
            {validationErrors.username && (
              <FormErrorMessage>{validationErrors.username}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl id="password" isInvalid={validationErrors.password}>
            <FormLabel color="gray.700">Password</FormLabel>
            <Input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="white"
              borderColor="gray.300"
              borderRadius="md"
              _hover={{ borderColor: "teal.400" }}
              _focus={{ borderColor: "teal.400", boxShadow: "0px 0px 4px teal" }}
            />
            {validationErrors.password && (
              <FormErrorMessage>{validationErrors.password}</FormErrorMessage>
            )}
          </FormControl>

          <Button
            type="submit"
            bgGradient="linear(to-r, #3182ce, #63b3ed)"
            color="white"
            _hover={{ bgGradient: "linear(to-r, #2b6cb0, #4299e1)" }}
            _active={{ bgGradient: "linear(to-r, #2a4365, #3182ce)" }}
            size="lg"
            width="full"
            borderRadius="md"
            boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
          >
            Login
          </Button>

          {error && (
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          )}
        </VStack>
      </form>
    </Box>

  );
};

export default LoginForm;
