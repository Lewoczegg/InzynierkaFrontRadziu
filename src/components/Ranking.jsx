import React, { useEffect, useState } from 'react';
import { Box, Text, Spinner, Center, Table, Thead, Tbody, Tr, Th, Td, Icon, HStack } from '@chakra-ui/react';
import { fetchUserRanking } from '../api';
import { FaCrown } from 'react-icons/fa';

function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRanking = async () => {
      try {
        setLoading(true);
        const rankingData = await fetchUserRanking();
        const rankingArray = Object.entries(rankingData).map(([username, points]) => ({ username, points }));
        rankingArray.sort((a, b) => b.points - a.points);
        setRanking(rankingArray);
      } catch (err) {
        setError('Failed to fetch ranking. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getRanking();
  }, []);

  if (loading) {
    return (
      <Center height="100%">
        <Spinner size="xl" color="white" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="100%">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Box p={4}>
      <Text fontSize="3xl" color="white" mb={4}>
        User Ranking
      </Text>
      <Table variant="striped" colorScheme="gray" bg="gray.800" borderRadius="md" boxShadow="lg">
        <Thead>
          <Tr>
            <Th color="white" fontSize="lg" textAlign="center">Rank</Th>
            <Th color="white" fontSize="lg" textAlign="center">Username</Th>
            <Th color="white" fontSize="lg" textAlign="center">Points</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ranking.map((user, index) => (
            <Tr key={index} >
              <Td textAlign="center">
                {index === 0 ? (
                  <HStack justifyContent="center">
                    <Text fontSize="xl" fontWeight="bold">1</Text>
                    <Icon as={FaCrown} w={5} h={5} color="yellow.400" />
                  </HStack>
                ) : (
                  <Text fontSize="md" color="gray.300">{index + 1}</Text>
                )}
              </Td>
              <Td textAlign="center" color={index === 0 ? "yellow.300" : "gray.300"} fontWeight={index === 0 ? "bold" : "normal"}>
                {user.username}
              </Td>
              <Td textAlign="center" color="gray.300">
                {user.points}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Ranking;
