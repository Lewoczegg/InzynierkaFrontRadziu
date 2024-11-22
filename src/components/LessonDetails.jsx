import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid, Spinner, Center, Link, Button } from '@chakra-ui/react';
import { fetchVisibleAssignments } from '../api';
import { useParams, Link as RouterLink } from 'react-router-dom';

function LessonDetails() {
  const { lessonId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAssignments = async () => {
      try {
        const data = await fetchVisibleAssignments();
        const filteredAssignments = data.filter((assignment) => assignment.lesson.lessonId === parseInt(lessonId));
        setAssignments(filteredAssignments);
      } catch (err) {
        setError('Failed to fetch assignments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getAssignments();
  }, [lessonId]);

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" color="teal.400" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="100vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, #0f0a19, #1a1a40)"
      color="gray.300"
      p={10}
    >
      {/* Sekcja powitalna */}
      <Box
        bg="#1b1133"
        borderRadius="lg"
        p={8}
        mb={10}
        boxShadow="lg"
        textAlign="center"
        transition="transform 0.3s ease, box-shadow 0.3s ease"
        _hover={{ transform: "scale(1.02)", boxShadow: "xl" }}
      >
        <Text fontSize={{ base: "3xl", md: "4xl" }} color="white" mb={4}>
          Assignments for Lesson {lessonId}
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.300">
          Here are the assignments available for this lesson. Practice to master the concepts!
        </Text>
      </Box>

      {/* Lista zadań */}
      {assignments.length === 0 ? (
        <Box
          bg="#1b1133"
          borderRadius="md"
          p={6}
          textAlign="center"
          boxShadow="md"
        >
          <Text fontSize="lg" color="gray.400">
            No assignments available for this lesson.
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {assignments.map((assignment) => (
            <Box
              key={assignment.assignmentId}
              as={assignment.available ? RouterLink : "div"}
              to={assignment.available ? `/assignments/${assignment.assignmentId}` : undefined}
              p={6}
              bg={assignment.available ? "#2c1e4b" : "#1a1a40"}
              borderRadius="lg"
              boxShadow="md"
              color="white"
              cursor={assignment.available ? "pointer" : "not-allowed"}
              _hover={assignment.available ? { transform: "scale(1.05)", boxShadow: "lg" } : {}}
              transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
            >
              <Text fontSize="2xl" fontWeight="bold" mb={4}>
                {assignment.title}
              </Text>
              {!assignment.available && (
                <Text fontSize="sm" color="red.400">
                  Your level or title is too low to access this assignment.
                </Text>
              )}
              {assignment.available && (
                <Button
                  mt={4}
                  colorScheme="teal"
                  variant="outline"
                  size="sm"
                >
                  Start Assignment
                </Button>
              )}
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default LessonDetails;
