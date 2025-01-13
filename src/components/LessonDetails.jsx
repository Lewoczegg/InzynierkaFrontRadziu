import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid, Spinner, Center, Button } from '@chakra-ui/react';
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
      bgGradient="linear(to-b, #f5f7fa, #e9eff5)"
      color="gray.800"
      p={10}
    >
      <Box
        bgGradient="linear(to-r, #2a7a69, #316fa8)"
        borderRadius="lg"
        p={8}
        mb={10}
        textAlign="center"
        color="white"
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
      >
        <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" mb={4}>
          Assignments for Lesson {lessonId}
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }}>
          Here are the assignments available for this lesson. Practice to master the concepts!
        </Text>
      </Box>

      {assignments.length === 0 ? (
        <Box
          bg="#f8f9fc"
          borderRadius="md"
          p={6}
          textAlign="center"
          color="gray.600"
          boxShadow="0px 2px 10px rgba(0, 0, 0, 0.1)"
        >
          <Text fontSize="lg">No assignments available for this lesson.</Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {assignments.map((assignment) => (
            <Box
              key={assignment.assignmentId}
              as={assignment.available ? RouterLink : "div"}
              to={assignment.available ? `/assignments/${assignment.assignmentId}` : undefined}
              p={6}
              bg={assignment.available ? "#ffffff" : "#f0f0f0"}
              borderRadius="lg"
              color="gray.800"
              cursor={assignment.available ? "pointer" : "not-allowed"}
              _hover={
                assignment.available
                  ? {
                      transform: "scale(1.05)",
                      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                      backgroundColor: "#f7f9fc",
                    }
                  : {}
              }
              transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
              boxShadow="0px 2px 10px rgba(0, 0, 0, 0.1)"
            >
              <Text fontSize="2xl" fontWeight="bold" mb={4}>
                {assignment.title}
              </Text>
              {!assignment.available && (
                <Text fontSize="sm" color="red.500">
                  Your level or title is too low to access this assignment.
                </Text>
              )}
              {assignment.available && (
                <Button
                  mt={4}
                  colorScheme="teal"
                  variant="solid"
                  size="sm"
                  boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)"
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
