import React from 'react';
import { Box, Text, Icon, VStack } from '@chakra-ui/react';
import { FiClipboard } from 'react-icons/fi'; // Import ikony z react-icons
import { Link as RouterLink } from 'react-router-dom';

function DailyTaskTile() {
  return (
    <Box
      as={RouterLink}
      to="/daily-task"
      p={6}
      bg="orange.500"
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
      width="260px" // Szerokość kafelka
    >
      <VStack spacing={4}>
        {/* Ikona reprezentująca zadanie */}
        <Icon as={FiClipboard} w={16} h={16} color="yellow.300" />
        
        {/* Tekst tytułowy */}
        <Text fontSize="2xl" fontWeight="bold">
          Daily Task
        </Text>
        
        {/* Krótki opis zachęcający do wzięcia udziału */}
        <Text fontSize="md" color="gray.100">
          Complete a new challenge and improve your skills today!
        </Text>
      </VStack>
    </Box>
  );
}

export default DailyTaskTile;
