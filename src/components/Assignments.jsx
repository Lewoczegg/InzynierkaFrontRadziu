import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid, Spinner, Center, Link } from '@chakra-ui/react';
import { fetchAssignments } from '../api'; // Import funkcji API
import { Link as RouterLink } from 'react-router-dom';

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAssignments = async () => {
      try {
        const data = await fetchAssignments(); // Pobieranie danych z API
        setAssignments(data);
      } catch (err) {
        setError('Failed to fetch assignments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getAssignments();
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
      <Text fontSize="2xl" color="white" mb={4}>
        Assignments Page
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
        {assignments.map((assignment) => (
          <Link as={RouterLink} to={`/assignments/${assignment.assignmentId}`} key={assignment.assignmentId} style={{ textDecoration: 'none' }}>
            <Box
              p={4}
              bg="gray.700"
              borderRadius="md"
              boxShadow="md"
              color="white"
              cursor="pointer"
              _hover={{ bg: "gray.600", transform: "scale(1.05)" }}
              transition="transform 0.2s ease-in-out"
            >
              <Text fontSize="xl" mb={2}>
                {assignment.title}
              </Text>
              {/* <Text fontSize="md" color="gray.300">
                {assignment.description}
              </Text> */}
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Assignments;

