import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid, Spinner, Center, Link, Button } from '@chakra-ui/react';
import { fetchLessons } from '../api';
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
          Lessons for Course {courseId}
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }}>
          Explore the lessons available for this course and enhance your skills!
        </Text>
      </Box>

      {lessons.length === 0 ? (
        <Box
          bg="#f8f9fc"
          borderRadius="md"
          p={6}
          textAlign="center"
          color="gray.600"
          boxShadow="0px 2px 10px rgba(0, 0, 0, 0.1)"
        >
          <Text fontSize="lg">No lessons available for this course.</Text>
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
                bg="#ffffff"
                borderRadius="lg"
                color="gray.800"
                cursor="pointer"
                _hover={{
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "#f7f9fc",
                }}
                transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
                boxShadow="0px 2px 10px rgba(0, 0, 0, 0.1)"
              >
                <Text fontSize="2xl" fontWeight="bold" mb={4}>
                  {lesson.title}
                </Text>
                <Text fontSize="md" color="gray.600" mb={4}>
                  {lesson.content}
                </Text>
                <Button
                  mt={4}
                  colorScheme="teal"
                  variant="solid"
                  size="sm"
                  boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)"
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
