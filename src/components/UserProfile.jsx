import { Box, Text, VStack, HStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Spinner, Center, SimpleGrid, Progress, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchUserInfo, fetchUserProgress, fetchAssignmentCompletionPercentage, fetchCourseCompletionPercentage, fetchLessonCompletionPercentage } from "../api";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [assignmentCompletion, setAssignmentCompletion] = useState(null);
  const [courseCompletion, setCourseCompletion] = useState(null);
  const [lessonCompletion, setLessonCompletion] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [loadingUserProgress, setLoadingUserProgress] = useState(true);
  const [loadingCompletion, setLoadingCompletion] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo();
        setUserInfo(data);
      } catch (err) {
        setError("Failed to fetch user info. Please try again later.");
      } finally {
        setLoadingUserInfo(false);
      }
    };

    const getUserProgress = async () => {
      try {
        const data = await fetchUserProgress();

        const coursesArray = Object.keys(data).map((key) => ({
          courseKey: key,
          ...data[key]
        }));

        coursesArray.sort((a, b) => {
          const numA = parseInt(a.courseTitle.split(".")[0].trim());
          const numB = parseInt(b.courseTitle.split(".")[0].trim());
          return numA - numB;
        });

        const sortedData = coursesArray.reduce((acc, course) => {
          acc[course.courseKey] = course;
          return acc;
        }, {});

        setUserProgress(sortedData);
      } catch (err) {
        setError("Failed to fetch user progress. Please try again later.");
      } finally {
        setLoadingUserProgress(false);
      }
    };


    const getCompletionPercentages = async () => {
      try {
        setLoadingCompletion(true);
        const [assignmentData, courseData, lessonData] = await Promise.all([
          fetchAssignmentCompletionPercentage(),
          fetchCourseCompletionPercentage(),
          fetchLessonCompletionPercentage()
        ]);
        setAssignmentCompletion(assignmentData.count);
        setCourseCompletion(courseData.count);
        setLessonCompletion(lessonData.count);
      } catch (err) {
        setError("Failed to fetch completion percentages. Please try again later.");
      } finally {
        setLoadingCompletion(false);
      }
    };

    getUserInfo();
    getUserProgress();
    getCompletionPercentages();
  }, []);

  if (loadingUserInfo || loadingUserProgress || loadingCompletion) {
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

  const getBorderColor = (level) => {
    if (level >= 1 && level <= 3) {
      return "teal.400";
    } else if (level >= 4 && level <= 6) {
      return "green.400";
    } else if (level >= 7 && level <= 9) {
      return "red.400";
    } else {
      return "teal.400";
    }
  };

  return (
    <Box minH="100vh" bgGradient="linear(to-b, #f5f7fa, #e9eff5)" color="gray.800" p={10}>
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
          User Profile
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }}>
          View your personal details and track your learning progress here.
        </Text>
      </Box>

      <HStack align="start" spacing={8} w="100%">
        <VStack align="stretch" w="30%" spacing={6}>
          {/* Level & Title */}
          <Box p={6} bg="white" borderRadius="lg" boxShadow="md" color="gray.800" textAlign="center">
            <Text fontWeight="bold" fontSize="2xl" mb={4}>
              Level & Title
            </Text>
            <Flex alignItems="center" justifyContent="center" w="100%" mt={4}>
              <Box position="relative" w="80px" h="80px" mx="auto">
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  w="100%"
                  h="100%"
                  borderRadius="50%"
                  borderWidth="8px"
                  borderColor={getBorderColor(userInfo.level)}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="md"
                >
                  <Text fontSize="2xl" color={getBorderColor(userInfo.level)} fontWeight="bold">
                    {userInfo.level}
                  </Text>
                </Box>
              </Box>
            </Flex>

            <Text fontSize="3xl" fontWeight="extrabold" color="teal.400">
              {userInfo.title}
            </Text>
          </Box>

          {/* User Information */}
          <Box p={6} bg="white" borderRadius="lg" boxShadow="md" color="gray.800">
            <Text fontWeight="bold" fontSize="2xl" mb={4}>
              User Information
            </Text>
            {userInfo ? (
              <VStack align="start" spacing={4}>
                <Text>
                  <b>First Name:</b> {userInfo.firstName}
                </Text>
                <Text>
                  <b>Surname:</b> {userInfo.surname}
                </Text>
                <Text>
                  <b>Email:</b> {userInfo.email}
                </Text>
                <Text>
                  <b>Age:</b> {userInfo.age}
                </Text>
                <Text>
                  <b>Username:</b> {userInfo.username}
                </Text>
              </VStack>
            ) : (
              <Text>No user information available.</Text>
            )}
          </Box>

          {/* Progress Overview */}
          <Box
            p={6}
            bgGradient="linear(to-r, #6a11cb, #2575fc)"
            borderRadius="lg"
            boxShadow="md"
            color="white"
          >
            <Text fontWeight="bold" fontSize="2xl" mb={4}>
              Progress Overview
            </Text>
            <Box mb={4}>
              <Text fontWeight="bold" mb={2}>
                Assignment Completion
              </Text>
              <Progress value={assignmentCompletion} colorScheme="teal" size="lg" borderRadius="md" mb={2} />
              <Text fontSize="lg">{assignmentCompletion}%</Text>
            </Box>
            <Box mb={4}>
              <Text fontWeight="bold" mb={2}>
                Course Completion
              </Text>
              <Progress value={courseCompletion} colorScheme="purple" size="lg" borderRadius="md" mb={2} />
              <Text fontSize="lg">{courseCompletion}%</Text>
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2}>
                Lesson Completion
              </Text>
              <Progress value={lessonCompletion} colorScheme="pink" size="lg" borderRadius="md" mb={2} />
              <Text fontSize="lg">{lessonCompletion}%</Text>
            </Box>
          </Box>
        </VStack>

        {/* User Progress */}
        <Box w="70%" p={6} bg="white" borderRadius="lg" boxShadow="md" color="gray.800">
          <Text fontWeight="bold" fontSize="2xl" mb={4}>
            User Progress
          </Text>
          {userProgress ? (
            <Accordion allowMultiple>
              {Object.values(userProgress).map((course, courseIndex) => (
                <AccordionItem key={courseIndex} border="none">
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "teal.100", color: "teal.800" }}
                      transition="background-color 0.2s ease-in-out"
                    >
                      <Box flex="1" textAlign="left" fontWeight="bold" color="teal.600">
                        {course.courseTitle}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {course.lessons.length > 0 ? (
                      <Accordion allowMultiple>
                        {course.lessons.map((lesson, lessonIndex) => (
                          <AccordionItem key={lessonIndex} border="none">
                            <h2>
                              <AccordionButton
                                _expanded={{ bg: "purple.100", color: "purple.800" }}
                                transition="background-color 0.2s ease-in-out"
                              >
                                <Box flex="1" textAlign="left" fontWeight="bold" color="purple.600">
                                  {lesson.lessonTitle}
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              {lesson.assignments.length > 0 ? (
                                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                                  {lesson.assignments.map((assignment, assignmentIndex) => (
                                    <Box
                                      key={assignmentIndex}
                                      p={6}
                                      borderRadius="md"
                                      bg="gray.100"
                                      boxShadow="md"
                                      color="gray.700"
                                    >
                                      <Text fontSize="lg" fontWeight="bold" mb={2}>
                                        Assignment: {assignment.assignmentTitle}
                                      </Text>
                                      <Text fontSize="md" mb={1}>
                                        <b>Grade:</b> {assignment.submission.grade}%
                                      </Text>
                                      <Text fontSize="md">
                                        <b>Submitted At:</b> {new Date(assignment.submission.submittedAt).toLocaleString()}
                                      </Text>
                                    </Box>
                                  ))}
                                </SimpleGrid>
                              ) : (
                                <Text color="gray.500">No assignments completed yet.</Text>
                              )}
                            </AccordionPanel>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <Text color="gray.500">No lessons completed yet.</Text>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <Text>No progress data available.</Text>
          )}
        </Box>
      </HStack>
    </Box>
  );
};

export default UserProfile;