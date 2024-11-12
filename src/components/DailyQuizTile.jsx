import React from 'react';
import { Box, Text, Icon, VStack } from '@chakra-ui/react';
import { FiAward } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

function DailyQuizTile() {
  return (
    <Box
      as={RouterLink}
      to="/daily-quiz"
      p={6}
      bg="teal.500"
      borderRadius="md"
      boxShadow="lg"
      color="white"
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{
        transform: 'scale(1.05)',
        boxShadow: 'xl',
      }}
      cursor="pointer"
      textAlign="center"
      width="260px"
    >
      <VStack spacing={4}>
        <Icon as={FiAward} w={16} h={16} color="yellow.300" />

        <Text fontSize="2xl" fontWeight="bold">
          Daily Quiz
        </Text>

        <Text fontSize="md" color="gray.100">
          Test your knowledge today and earn points!
        </Text>
      </VStack>
    </Box>
  );
}

export default DailyQuizTile;
