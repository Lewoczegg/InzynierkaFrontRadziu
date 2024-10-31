import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid, Spinner, Center, Link } from '@chakra-ui/react';
import { fetchCourses } from '../api'; // Import funkcji API
import { Link as RouterLink } from 'react-router-dom';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses(); 
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
          <Link as={RouterLink} to={`/courses/${course.courseId}`} key={course.courseId} style={{ textDecoration: 'none' }}>
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
                {course.title}
              </Text>
              <Text fontSize="md" color="gray.300">
                {course.description}
              </Text>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Courses;
