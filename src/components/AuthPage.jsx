import React, { useState } from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box w="100%" maxW="md" mx="auto" p={4}>
      <VStack spacing={4}>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <Button onClick={() => setIsLogin(!isLogin)} colorScheme="blue">
          {isLogin ? "Go to Register" : "Go to Login"}
        </Button>
      </VStack>
    </Box>
  );
};

export default AuthPage;
