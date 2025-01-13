import React from 'react';
import { Box, Text, Icon, VStack, Flex } from '@chakra-ui/react';
import { FiAward } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function DailyQuizTile() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleDailyQuizClick = () => {
    if (!isLoggedIn) {
      navigate('/auth');
    } else {
      navigate('/daily-quiz');
    }
  };

  return (
    <Flex
      onClick={handleDailyQuizClick}
      cursor="pointer"
      alignItems="stretch"
      height="100%"
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{
        transform: 'scale(1.05)',
        boxShadow: 'lg',
      }}
      flex="1"
      borderRadius="md"
      border="transparent"
    >
      <Box
        bg="#2a7a69"
        borderRadius="md"
        width="10px"
        marginRight="8px"
        mt="8px"
        mb="8px"
      />
      <Box
        flex="1"
        p={6}
        bg="#f7f9fc"
        borderRadius="md"
        boxShadow="md"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={4} align="center">
          <Icon as={FiAward} w={16} h={16} color="#316fa8" />
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            Daily Quiz
          </Text>
          <Text fontSize="md" color="gray.600">
            Test your knowledge today and earn points!
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
}

export default DailyQuizTile;
