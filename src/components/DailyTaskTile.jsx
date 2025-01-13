import React from 'react';
import { Box, Text, Icon, VStack, Flex } from '@chakra-ui/react';
import { FiClipboard } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function DailyTaskTile() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleDailyTaskClick = () => {
    if (!isLoggedIn) {
      navigate('/auth');
    } else {
      navigate('/daily-task');
    }
  };

  return (
    <Flex
      onClick={handleDailyTaskClick}
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
        bg="#c05621"
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
          <Icon as={FiClipboard} w={16} h={16} color="#8c3d1b" />
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            Daily Task
          </Text>
          <Text fontSize="md" color="gray.600">
            Complete a new challenge and improve your skills today!
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
}

export default DailyTaskTile;
