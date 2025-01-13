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
          Explore Our Courses
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }}>
          Learn new skills with our well-prepared courses and advance your journey with Code-Series!
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {courses.map((course) => (
          <Box
            key={course.courseId}
            p={6}
            bg={course.available ? "#ffffff" : "#f0f0f0"}
            borderRadius="lg"
            color="gray.800"
            cursor={course.available ? "pointer" : "not-allowed"}
            _hover={
              course.available
                ? {
                    transform: "scale(1.05)",
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#f7f9fc",
                  }
                : {}
            }
            transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
            as={course.available ? RouterLink : "div"}
            to={course.available ? `/courses/${course.courseId}` : undefined}
          >
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              {course.title}
            </Text>
            <Text fontSize="md" color="gray.600" mb={4}>
              {course.description}
            </Text>
            {!course.available && (
              <Text fontSize="sm" color="red.500">
                Your level is too low to access this course
              </Text>
            )}
            {course.available && (
              <Button
                mt={4}
                colorScheme="teal"
                variant="solid"
                size="sm"
                boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)"
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
