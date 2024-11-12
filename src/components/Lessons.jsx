import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid, Spinner, Center } from '@chakra-ui/react';
import { fetchVisibleLessons } from '../api';
import { Link as RouterLink } from 'react-router-dom';

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLessons = async () => {
      try {
        const data = await fetchVisibleLessons();
        setLessons(data);
      } catch (err) {
        setError('Failed to fetch lessons. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getLessons();
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
        Lessons Page
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
        {lessons.map((lesson) => (
          <Box
            key={lesson.lessonId}
            p={4}
            bg={lesson.available ? "gray.600" : "gray.700"}
            borderRadius="md"
            boxShadow="md"
            color="white"
            cursor={lesson.available ? "pointer" : "not-allowed"}
            _hover={lesson.available ? { bg: "gray.500", transform: "scale(1.05)" } : {}}
            transition="transform 0.2s ease-in-out"
            as={lesson.available ? RouterLink : "div"}
            to={lesson.available ? `/lessons/${lesson.lessonId}` : undefined}
          >
            <Text fontSize="xl" mb={2}>
              {lesson.title}
            </Text>
            <Text fontSize="md" color="gray.300" mb={2}>
              {lesson.content}
            </Text>
            {!lesson.available && (
              <Text fontSize="sm" color="red.400">
                Your level is too low to access this lesson.
              </Text>
            )}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Lessons;
