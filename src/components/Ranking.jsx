import React, { useEffect, useState } from 'react';
import { Box, Text, Spinner, Center, Table, Thead, Tbody, Tr, Th, Td, Icon, HStack, SimpleGrid } from '@chakra-ui/react';
import { fetchUserRanking, fetchTotalPoints } from '../api';
import { FaCrown } from 'react-icons/fa';

function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [totalPoints, setTotalPoints] = useState([]);
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

        const totalPointsData = await fetchTotalPoints();
        const totalPointsArray = Object.entries(totalPointsData).map(([username, points]) => ({ username, points }));
        totalPointsArray.sort((a, b) => b.points - a.points);
        setTotalPoints(totalPointsArray);
      } catch (err) {
        setError('Failed to fetch ranking or total points. Please try again later.');
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
    <Box minH="100vh" bgGradient="linear(to-b, #f5f7fa, #e9eff5)" color="gray.800" p={10}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Box p={6} bg="white" borderRadius="lg" boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)">
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Quiz Ranking
          </Text>
          <Table colorScheme="teal" borderRadius="md" boxShadow="sm">
            <Thead bg="teal.500">
              <Tr>
                <Th color="white" fontSize="lg" textAlign="center">Rank</Th>
                <Th color="white" fontSize="lg" textAlign="center">Username</Th>
                <Th color="white" fontSize="lg" textAlign="center">Points</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ranking.map((user, index) => (
                <Tr
                  key={user.username}
                  bgColor={index === 0 ? "teal.100" : "white"}
                  borderRadius={index === 0 ? "lg" : "none"}
                  border={index === 0 ? "2px solid teal" : "none"}
                >
                  <Td textAlign="center">
                    {index === 0 ? (
                      <HStack justifyContent="center">
                        <Text fontSize="xl" fontWeight="bold" color="teal.700">1</Text>
                        <Icon as={FaCrown} w={5} h={5} color="teal.700" />
                      </HStack>
                    ) : (
                      <Text fontSize="md" color="gray.600">{index + 1}</Text>
                    )}
                  </Td>
                  <Td
                    textAlign="center"
                    color={index === 0 ? "teal.700" : "gray.600"}
                    fontWeight={index === 0 ? "bold" : "normal"}
                  >
                    {user.username}
                  </Td>
                  <Td
                    textAlign="center"
                    color={index === 0 ? "teal.700" : "gray.600"}
                    fontWeight={index === 0 ? "bold" : "normal"}
                  >
                    {user.points}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Box p={6} bg="white" borderRadius="lg" boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)">
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Task Ranking
          </Text>
          <Table colorScheme="teal" borderRadius="md" boxShadow="sm">
            <Thead bg="teal.500">
              <Tr>
                <Th color="white" fontSize="lg" textAlign="center">Rank</Th>
                <Th color="white" fontSize="lg" textAlign="center">Username</Th>
                <Th color="white" fontSize="lg" textAlign="center">Total Points</Th>
              </Tr>
            </Thead>
            <Tbody>
              {totalPoints.map((user, index) => (
                <Tr
                  key={user.username}
                  bgColor={index === 0 ? "teal.100" : "white"}
                  borderRadius={index === 0 ? "lg" : "none"}
                  border={index === 0 ? "2px solid teal" : "none"}
                >
                  <Td textAlign="center">
                    {index === 0 ? (
                      <HStack justifyContent="center">
                        <Text fontSize="xl" fontWeight="bold" color="teal.700">1</Text>
                        <Icon as={FaCrown} w={5} h={5} color="teal.700" />
                      </HStack>
                    ) : (
                      <Text fontSize="md" color="gray.600">{index + 1}</Text>
                    )}
                  </Td>
                  <Td
                    textAlign="center"
                    color={index === 0 ? "teal.700" : "gray.600"}
                    fontWeight={index === 0 ? "bold" : "normal"}
                  >
                    {user.username}
                  </Td>
                  <Td
                    textAlign="center"
                    color={index === 0 ? "teal.700" : "gray.600"}
                    fontWeight={index === 0 ? "bold" : "normal"}
                  >
                    {user.points}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default Ranking;
