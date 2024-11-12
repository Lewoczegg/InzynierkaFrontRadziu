import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid, Spinner, Center, Link } from '@chakra-ui/react';
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
        Assignments for Lesson {lessonId}
      </Text>
      {assignments.length === 0 ? (
        <Text color="gray.300">No assignments available for this lesson.</Text>
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
          {assignments.map((assignment) => (
            <Box
              key={assignment.assignmentId}
              as={assignment.available ? RouterLink : "div"}
              to={assignment.available ? `/assignments/${assignment.assignmentId}` : undefined}
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
      )}
    </Box>
  );
}

export default LessonDetails;
