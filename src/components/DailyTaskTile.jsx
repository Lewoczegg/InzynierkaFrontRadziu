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
        boxShadow: 'xl',
      }}
      flex="1" // Dodanie tej właściwości, aby się równomiernie rozciągało
    >
      {/* Lewy pasek */}
      <Box
        bg="orange.400"
        borderRadius="md"
        width="10px"
        marginRight="8px"
        mt="8px"
        mb="8px"
      />
      {/* Zawartość */}
      <Box
        flex="1"
        p={6}
        bg="#2c1e4b"
        borderRadius="md"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={4} align="center">
          <Icon as={FiClipboard} w={16} h={16} color="yellow.300" />
          <Text fontSize="2xl" fontWeight="bold" color="gray.100">
            Daily Task
          </Text>
          <Text fontSize="md" color="gray.100">
            Complete a new challenge and improve your skills today!
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
}

export default DailyTaskTile;