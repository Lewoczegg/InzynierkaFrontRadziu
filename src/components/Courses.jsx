import React, { useEffect, useState } from 'react';
import { Box, Text, SimpleGrid, Spinner, Center, Button } from '@chakra-ui/react';
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
          Explore Our Courses
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.300">
          Learn new skills with our well-prepared courses and advance your journey with Code-Series!
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {courses.map((course) => (
          <Box
            key={course.courseId}
            p={6}
            bg={course.available ? "#2c1e4b" : "#1a1a40"}
            borderRadius="lg"
            boxShadow="md"
            color="white"
            cursor={course.available ? "pointer" : "not-allowed"}
            _hover={course.available ? { transform: "scale(1.05)", boxShadow: "lg" } : {}}
            transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
            as={course.available ? RouterLink : "div"}
            to={course.available ? `/courses/${course.courseId}` : undefined}
          >
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              {course.title}
            </Text>
            <Text fontSize="md" color="gray.400" mb={4}>
              {course.description}
            </Text>
            {!course.available && (
              <Text fontSize="sm" color="red.400">
                Your level is too low to access this course
              </Text>
            )}
            {course.available && (
              <Button
                mt={4}
                colorScheme="teal"
                variant="outline"
                size="sm"
              >
                Learn More
              </Button>
            )}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Courses;

