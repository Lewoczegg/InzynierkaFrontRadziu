import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid, Spinner, Center, Link } from '@chakra-ui/react';
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
        Lessons for Course {courseId}
      </Text>
      {lessons.length === 0 ? (
        <Text color="gray.300">No lessons available for this course.</Text>
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
          {lessons.map((lesson) => (
            <Link as={RouterLink} to={`/lessons/${lesson.lessonId}`} key={lesson.lessonId} style={{ textDecoration: 'none' }}>
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
                  {lesson.title}
                </Text>
                <Text fontSize="md" color="gray.300">
                  {lesson.content}
                </Text>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default CourseDetails;
