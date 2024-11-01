import React, { useState } from "react";
import { Box, Input, Button, Text, VStack, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { registerUser } from "../api";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");

  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleRegister = async () => {
    const errors = {};

    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    if (!email) errors.email = "Email is required";
    if (!firstName) errors.firstName = "First name is required";
    if (!surname) errors.surname = "Surname is required";
    if (!phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!age) errors.age = "Age is required";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const requestData = {
      username,
      password,
      email,
      firstName,
      surname,
      phoneNumber,
      age: parseInt(age, 10), // Konwersja wieku do liczby
    };

    try {
      setError(null);
      await registerUser(requestData);
      alert("Registration successful! You can now log in.");
      window.location.href = "/auth";
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

        {/* Pola formularza z walidacją */}
        <FormControl id="username" isInvalid={validationErrors.username}>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {validationErrors.username && <FormErrorMessage>{validationErrors.username}</FormErrorMessage>}
        </FormControl>

        <FormControl id="password" isInvalid={validationErrors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {validationErrors.password && <FormErrorMessage>{validationErrors.password}</FormErrorMessage>}
        </FormControl>

        <FormControl id="email" isInvalid={validationErrors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {validationErrors.email && <FormErrorMessage>{validationErrors.email}</FormErrorMessage>}
        </FormControl>

        <FormControl id="firstName" isInvalid={validationErrors.firstName}>
          <FormLabel>First Name</FormLabel>
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {validationErrors.firstName && <FormErrorMessage>{validationErrors.firstName}</FormErrorMessage>}
        </FormControl>

        <FormControl id="surname" isInvalid={validationErrors.surname}>
          <FormLabel>Surname</FormLabel>
          <Input
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          {validationErrors.surname && <FormErrorMessage>{validationErrors.surname}</FormErrorMessage>}
        </FormControl>

        <FormControl id="phoneNumber" isInvalid={validationErrors.phoneNumber}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {validationErrors.phoneNumber && <FormErrorMessage>{validationErrors.phoneNumber}</FormErrorMessage>}
        </FormControl>

        <FormControl id="age" isInvalid={validationErrors.age}>
          <FormLabel>Age</FormLabel>
          <Input
            placeholder="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {validationErrors.age && <FormErrorMessage>{validationErrors.age}</FormErrorMessage>}
        </FormControl>

        <Button onClick={handleRegister} colorScheme="teal" width="full">
          Register
        </Button>
    
        {error && <Text color="red.500">{error}</Text>}
      </VStack>
    </Box>
  );
};

export default RegisterForm;
