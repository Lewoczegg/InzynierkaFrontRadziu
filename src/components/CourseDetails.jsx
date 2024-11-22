import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid, Spinner, Center, Link, Button } from '@chakra-ui/react';
import { fetchLessons } from '../api'; // Import funkcji API
import { useParams, Link as RouterLink } from 'react-router-dom';

function CourseDetails() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLessons = async () => {
      try {
        const data = await fetchLessons();
        const filteredLessons = data.filter((lesson) => lesson.course.courseId === parseInt(courseId));
        setLessons(filteredLessons);
      } catch (err) {
        setError('Failed to fetch lessons. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getLessons();
  }, [courseId]);

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
      >
        <Text fontSize={{ base: "3xl", md: "4xl" }} color="white" mb={4}>
          Lessons for Course {courseId}
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.300">
          Explore the lessons available for this course and enhance your skills!
        </Text>
      </Box>

      {/* Lista lekcji */}
      {lessons.length === 0 ? (
        <Box
          bg="#1b1133"
          borderRadius="md"
          p={6}
          textAlign="center"
          boxShadow="md"
        >
          <Text fontSize="lg" color="gray.400">
            No lessons available for this course.
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {lessons.map((lesson) => (
            <Link
              as={RouterLink}
              to={`/lessons/${lesson.lessonId}`}
              key={lesson.lessonId}
              style={{ textDecoration: 'none' }}
            >
              <Box
                p={6}
                bg="#2c1e4b"
                borderRadius="lg"
                boxShadow="md"
                color="white"
                cursor="pointer"
                _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
              >
                <Text fontSize="2xl" fontWeight="bold" mb={4}>
                  {lesson.title}
                </Text>
                <Text fontSize="md" color="gray.400" mb={4}>
                  {lesson.content}
                </Text>
                <Button
                  mt={4}
                  colorScheme="teal"
                  variant="outline"
                  size="sm"
                >
                  View Lesson
                </Button>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default CourseDetails;

