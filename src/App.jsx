import React from 'react';
import { Box, Text, Flex, Button, Stack, Heading } from "@chakra-ui/react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MenuBar from './components/MenuBar';
import Assignments from './components/Assignments';
import Lessons from './components/Lessons';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import LessonDetails from './components/LessonDetails';
import AssignmentEditor from './components/AssignmentEditor';
import AuthPage from './components/AuthPage';
import UserProfile from './components/UserProfile';
import DailyQuiz from './components/DailyQuiz';
import DailyQuizTile from './components/DailyQuizTile';
import DailyTaskTile from './components/DailyTaskTile';
import DailyTaskEditor from './components/DailyTaskEditor';
import DailyTask from './components/DailyTask';
import Ranking from './components/Ranking';
import { FaArrowRight } from "react-icons/fa";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    if (!isLoggedIn) {
      navigate('/auth');
    } else {
      navigate(path);
    }
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, #0f0a19, #1a1a40)"
      color="gray.500"
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      <Box height="36px" flexShrink={0}>
      <MenuBar />
      </Box>
      <Box flex="1" overflow="hidden" >
        <Routes>
          <Route
            path="/"
            element={
              <Box flex="1" minH="100%" overflow="hidden">
                {/* Sekcja Powitalna */}
                <Box
                  bg="#1b1133"
                  borderRadius="lg"
                  p={8}
                  mb={10}
                  mt={10}
                  boxShadow="lg"
                  textAlign="center"
                  transition="transform 0.3s ease, box-shadow 0.3s ease"
                  _hover={{ transform: "scale(1.02)", boxShadow: "xl" }}
                >
                  <Heading
                    fontSize={{ base: "3xl", md: "4xl" }}
                    color="white"
                    mb={4}
                  >
                    Welcome to Code-Series!
                  </Heading>
                  <Text fontSize={{ base: "md", md: "lg" }} color="gray.300" mb={4}>
                    Join us in exploring our courses, lessons, assignments, daily quizzes, and tasks. Let your learning journey begin!
                  </Text>
                  <Button
                    mt={4}
                    colorScheme="teal"
                    size="lg"
                    rightIcon={<FaArrowRight />}
                    variant="solid"
                    boxShadow="md"
                    onClick={() => handleButtonClick("/courses")}
                  >
                    Get Started
                  </Button>
                </Box>

                {/* Sekcja z DailyQuizTile i DailyTaskTile */}
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={6}
                  justifyContent="center"
                  alignItems="stretch"
                  wrap={{ base: "wrap", md: "nowrap" }}
                  mb={10}
                >
                  <DailyQuizTile />
                  <DailyTaskTile />
                </Stack>

                {/* Karty poziome */}
                <Flex
                  direction={{ base: "column", md: "row" }}
                  justifyContent="space-between"
                  gap={6}
                  wrap={{ base: "wrap", md: "nowrap" }}
                  mb={10}
                >
                  <Box
                    p={6}
                    bg="#1b1133"
                    borderRadius="md"
                    boxShadow="md"
                    flex="1"
                    transition="transform 0.3s ease, box-shadow 0.3s ease"
                    _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                  >
                    <Text color="white" fontSize="2xl" fontWeight="bold" mb={3}>
                      Explore our Courses
                    </Text>
                    <Text color="gray.400" mb={4}>
                      Start learning with our well-prepared courses to master your skills.
                    </Text>
                    <Button
                      rightIcon={<FaArrowRight />}
                      colorScheme="purple"
                      variant="outline"
                      size="md"
                      onClick={() => handleButtonClick("/courses")}
                    >
                      Start Learning
                    </Button>
                  </Box>

                  <Box
                    p={6}
                    bg="#1b1133"
                    borderRadius="md"
                    boxShadow="md"
                    flex="1"
                    transition="transform 0.3s ease, box-shadow 0.3s ease"
                    _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                  >
                    <Text color="white" fontSize="2xl" fontWeight="bold" mb={3}>
                      Check your Assignments
                    </Text>
                    <Text color="gray.400" mb={4}>
                      Keep up with your progress by completing assignments.
                    </Text>
                    <Button
                      rightIcon={<FaArrowRight />}
                      colorScheme="teal"
                      variant="outline"
                      size="md"
                      onClick={() => handleButtonClick("/assignments")}
                    >
                      Go to Assignments
                    </Button>
                  </Box>

                  <Box
                    p={6}
                    bg="#1b1133"
                    borderRadius="md"
                    boxShadow="md"
                    flex="1"
                    transition="transform 0.3s ease, box-shadow 0.3s ease"
                    _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                  >
                    <Text color="white" fontSize="2xl" fontWeight="bold" mb={3}>
                      Join the Ranking
                    </Text>
                    <Text color="gray.400" mb={4}>
                      Compete with others and see your place in our ranking.
                    </Text>
                    <Button
                      rightIcon={<FaArrowRight />}
                      colorScheme="orange"
                      variant="outline"
                      size="md"
                      onClick={() => handleButtonClick("/ranking")}
                    >
                      See the Ranking
                    </Button>
                  </Box>
                </Flex>
              </Box>
            }
          />

          <Route path="/assignments" element={<Assignments />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/lessons/:lessonId" element={<LessonDetails />} />
          <Route path="/assignments/:assignmentId" element={<AssignmentEditor />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/daily-quiz" element={<DailyQuiz />} />
          <Route path="/daily-task" element={<DailyTaskEditor />} />
          <Route path="/daily-task" element={<DailyTask />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;