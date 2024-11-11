import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid, Spinner, Center } from '@chakra-ui/react';
import { fetchVisibleAssignments } from '../api'; // Import nowej funkcji API
import { Link as RouterLink } from 'react-router-dom';

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAssignments = async () => {
      try {
        const data = await fetchVisibleAssignments(); // Zmiana na nowy endpoint do pobierania zadań
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
          <Box
            key={assignment.assignmentId}
            as={assignment.available ? RouterLink : "div"} // Tylko dostępne zadania są klikalne
            to={assignment.available ? `/assignments/${assignment.assignmentId}` : undefined} // Przekierowanie tylko jeśli zadanie jest dostępne
            p={4}
            bg={assignment.available ? "gray.600" : "gray.700"}
            borderRadius="md"
            boxShadow="md"
            color="white"
            cursor={assignment.available ? "pointer" : "not-allowed"}
            _hover={assignment.available ? { bg: "gray.500", transform: "scale(1.05)" } : {}}
            transition="transform 0.2s ease-in-out"
          >
            <Text fontSize="xl" mb={2}>
              {assignment.title}
            </Text>
            {!assignment.available && (
              <Text fontSize="sm" color="red.400">
                Your level or title is too low to access this assignment.
              </Text>
            )}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Assignments;

