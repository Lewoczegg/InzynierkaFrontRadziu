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
    <Box w="100%" maxW="md" mx="auto" p={2} borderRadius="md">
      <form onSubmit={handleLogin}>
        <VStack spacing={4}>

          <FormControl id="username" isInvalid={validationErrors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {validationErrors.username && (
              <FormErrorMessage>{validationErrors.username}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl id="password" isInvalid={validationErrors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {validationErrors.password && (
              <FormErrorMessage>{validationErrors.password}</FormErrorMessage>
            )}
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Login
          </Button>

          {error && <Text color="red.500">{error}</Text>}
        </VStack>
      </form>
    </Box>
  );
};

export default LoginForm;
