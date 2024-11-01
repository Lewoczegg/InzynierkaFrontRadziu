import React, { useState } from "react";
import { Box, Input, Button, Text, VStack } from "@chakra-ui/react";
import { loginUser } from "../api";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
  
    const handleLogin = async () => {
      try {
        setError(null);
        await loginUser(username, password);
        alert("Login successful!");
        window.location.href = "/"; // Przekierowanie po zalogowaniu na stronę główną
      } catch (error) {
        setError(error.message);
      }
    };
  
    return (
      <Box w="100%" maxW="md" mx="auto" p={4} borderWidth="1px" borderRadius="md">
        <VStack spacing={4}>
          <Text fontSize="2xl" mb={4}>
            Login
          </Text>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} colorScheme="teal" width="full">
            Login
          </Button>
          {error && <Text color="red.500">{error}</Text>}
        </VStack>
      </Box>
    );
  };
  
  export default LoginForm;