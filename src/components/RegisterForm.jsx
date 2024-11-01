import React, { useState } from "react";
import { Box, Input, Button, Text, VStack } from "@chakra-ui/react";
import { registerUser } from "../api";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      setError(null);
      await registerUser(username, password);
      alert("Registration successful! You can now log in.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box w="100%" maxW="md" mx="auto" p={4} borderWidth="1px" borderRadius="md">
      <VStack spacing={4}>
        <Text fontSize="2xl" mb={4}>
          Register
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
        <Button onClick={handleRegister} colorScheme="teal" width="full">
          Register
        </Button>
        {error && <Text color="red.500">{error}</Text>}
      </VStack>
    </Box>
  );
};

export default RegisterForm;
