import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid, Spinner, Center } from '@chakra-ui/react';
import { fetchVisibleCourses } from '../api';
import { Link as RouterLink } from 'react-router-dom';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchVisibleCourses();
        setCourses(data);
      } catch (err) {
        setError('Failed to fetch courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getCourses();
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
        Courses Page
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
        {courses.map((course) => (
          <Box
            key={course.courseId}
            p={4}
            bg={course.available ? "gray.600" : "gray.700"}
            borderRadius="md"
            boxShadow="md"
            color="white"
            cursor={course.available ? "pointer" : "not-allowed"}
            _hover={course.available ? { bg: "gray.500", transform: "scale(1.05)" } : {}}
            transition="transform 0.2s ease-in-out"
            as={course.available ? RouterLink : "div"}
            to={course.available ? `/courses/${course.courseId}` : undefined}
          >
            <Text fontSize="xl" mb={2}>
              {course.title}
            </Text>
            <Text fontSize="md" color="gray.300" mb={2}>
              {course.description}
            </Text>
            {!course.available && (
              <Text fontSize="sm" color="red.400">
                Your level is too low to access this course
              </Text>
            )}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Courses;

