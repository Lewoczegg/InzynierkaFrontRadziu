import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid, Spinner, Center, Button } from '@chakra-ui/react';
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
      <Box
        bg="#1b1133"
        borderRadius="lg"
        p={8}
        mb={10}
        boxShadow="lg"
        textAlign="center"
      >
        <Text fontSize={{ base: "3xl", md: "4xl" }} color="white" mb={4}>
          Available Lessons
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.300">
          Explore the available lessons and enhance your knowledge!
        </Text>
      </Box>

      {lessons.length === 0 ? (
        <Box
          bg="#1b1133"
          borderRadius="md"
          p={6}
          textAlign="center"
          boxShadow="md"
        >
          <Text fontSize="lg" color="gray.400">
            No lessons available at this time.
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {lessons.map((lesson) => (
            <Box
              key={lesson.lessonId}
              p={6}
              bg={lesson.available ? "#2c1e4b" : "#1a1a40"}
              borderRadius="lg"
              boxShadow="md"
              color="white"
              cursor={lesson.available ? "pointer" : "not-allowed"}
              _hover={lesson.available ? { transform: "scale(1.05)", boxShadow: "lg" } : {}}
              transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
              as={lesson.available ? RouterLink : "div"}
              to={lesson.available ? `/lessons/${lesson.lessonId}` : undefined}
            >
              <Text fontSize="2xl" fontWeight="bold" mb={4}>
                {lesson.title}
              </Text>
              <Text fontSize="md" color="gray.400" mb={4}>
                {lesson.content}
              </Text>
              {!lesson.available && (
                <Text fontSize="sm" color="red.400">
                  Your level is too low to access this lesson.
                </Text>
              )}
              {lesson.available && (
                <Button
                  mt={4}
                  colorScheme="teal"
                  variant="outline"
                  size="sm"
                >
                  Start Lesson
                </Button>
              )}
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default Lessons;
