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
    <Box p={10}>
      <SimpleGrid columns={2} spacing={10}>
        <Box
          p={6}
          bg="#1b1133"
          borderRadius="lg"
          boxShadow="lg"
        >
          <Text fontSize="2xl" color="white" mb={4}>
            Quiz Ranking
          </Text>
          <Table colorScheme="yellow" borderRadius="md" boxShadow="lg">
            <Thead bg="yellow.600">
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
                  bgColor={index === 0 ? "yellow.700" : "#1b1133"}
                  borderRadius={index === 0 ? "lg" : "none"}
                  border={index === 0 ? "2px solid gold" : "none"}
                >
                  <Td textAlign="center">
                    {index === 0 ? (
                      <HStack justifyContent="center">
                        <Text fontSize="xl" fontWeight="bold" color="yellow.300">1</Text>
                        <Icon as={FaCrown} w={5} h={5} color="yellow.300" />
                      </HStack>
                    ) : (
                      <Text fontSize="md" color="whiteAlpha.900">{index + 1}</Text>
                    )}
                  </Td>
                  <Td
                    textAlign="center"
                    color={index === 0 ? "yellow.300" : "whiteAlpha.900"}
                    fontWeight={index === 0 ? "bold" : "normal"}
                  >
                    {user.username}
                  </Td>
                  <Td
                    textAlign="center"
                    color={index === 0 ? "yellow.300" : "whiteAlpha.900"}
                    fontWeight={index === 0 ? "bold" : "normal"}
                  >
                    {user.points}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Box
          p={6}
          bg="#1b1133"
          borderRadius="lg"
          boxShadow="lg"
        >
          <Text fontSize="2xl" color="white" mb={4}>
            Task Ranking
          </Text>
          <Table colorScheme="yellow" borderRadius="md" boxShadow="lg">
            <Thead bg="yellow.600">
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
                  bgColor={index === 0 ? "yellow.700" : "#1b1133"}
                  borderRadius={index === 0 ? "lg" : "none"}
                  border={index === 0 ? "2px solid gold" : "none"}
                >
                  <Td textAlign="center">
                    {index === 0 ? (
                      <HStack justifyContent="center">
                        <Text fontSize="xl" fontWeight="bold" color="yellow.300">1</Text>
                        <Icon as={FaCrown} w={5} h={5} color="yellow.300" />
                      </HStack>
                    ) : (
                      <Text fontSize="md" color="whiteAlpha.900">{index + 1}</Text>
                    )}
                  </Td>
                  <Td
                    textAlign="center"
                    color={index === 0 ? "yellow.300" : "whiteAlpha.900"}
                    fontWeight={index === 0 ? "bold" : "normal"}
                  >
                    {user.username}
                  </Td>
                  <Td
                    textAlign="center"
                    color={index === 0 ? "yellow.300" : "whiteAlpha.900"}
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
