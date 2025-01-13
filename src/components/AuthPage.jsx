import React, { useState } from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <Box w="100%" maxW="md" mx="auto" p={4} borderWidth="1px" borderRadius="md" mt={12}>
      <VStack spacing={4}>
        {isLoginView ? (
          <LoginForm />
        ) : (
          <RegisterForm switchToLogin={() => setIsLoginView(true)} />
        )}

        <Button
          variant="link"
          colorScheme="teal.700"
          onClick={() => setIsLoginView(!isLoginView)}
        >
          {isLoginView
            ? "Don't have an account? Register here."
            : "Already have an account? Login here."}
        </Button>
      </VStack>
    </Box>
  );
};

export default AuthPage;
