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
      return "white";
    } else if (level >= 4 && level <= 6) {
      return "green.500";
    } else if (level >= 7 && level <= 9) {
      return "red.500";
    } else {
      return "gray.500";
    }
  };

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
          User Profile
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.300">
          View your personal details and track your learning progress here.
        </Text>
      </Box>

      <HStack align="start" spacing={8} w="100%">
        <VStack align="stretch" w="30%" spacing={6}>
          {/* Box dla informacji o poziomie i tytule */}
          <Box
            p={6}
            bg="#2c1e4b"
            borderRadius="lg"
            boxShadow="md"
            color="white"
            textAlign="center"
          >
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
                  bg="#1e1e1e"
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

            <Text
              fontSize="3xl"
              fontWeight="extrabold"
              color="teal.400"
              animation="fadeIn 2s ease-in-out"
            >
              {userInfo.title}
            </Text>
            <style jsx>{`
              @keyframes fadeIn {
                0% {
                  opacity: 0;
                }
                100% {
                  opacity: 1;
                }
              }
            `}</style>

          </Box>

          {/* Box dla informacji użytkownika */}
          <Box
            p={6}
            bg="#2c1e4b"
            borderRadius="lg"
            boxShadow="md"
            color="white"
          >
            <Text fontWeight="bold" fontSize="2xl" mb={4}>
              User Information
            </Text>
            {userInfo ? (
              <VStack align="start" spacing={4}>
                <Text><b>First Name:</b> {userInfo.firstName}</Text>
                <Text><b>Surname:</b> {userInfo.surname}</Text>
                <Text><b>Email:</b> {userInfo.email}</Text>
                <Text><b>Age:</b> {userInfo.age}</Text>
                <Text><b>Username:</b> {userInfo.username}</Text>
              </VStack>
            ) : (
              <Text>No user information available.</Text>
            )}
          </Box>

          {/* Paski postępu */}
          <Box
            p={6}
            bg="#2c1e4b"
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
              <Progress
                value={assignmentCompletion}
                colorScheme="teal"
                size="lg"
                borderRadius="md"
                mb={2}
              />
              <Text fontSize="lg" color="gray.300">
                {assignmentCompletion}%
              </Text>
            </Box>
            <Box mb={4}>
              <Text fontWeight="bold" mb={2}>
                Course Completion
              </Text>
              <Progress
                value={courseCompletion}
                colorScheme="purple"
                size="lg"
                borderRadius="md"
                mb={2}
              />
              <Text fontSize="lg" color="gray.300">
                {courseCompletion}%
              </Text>
            </Box>
            <Box>
              <Text fontWeight="bold" mb={2}>
                Lesson Completion
              </Text>
              <Progress
                value={lessonCompletion}
                colorScheme="pink"
                size="lg"
                borderRadius="md"
                mb={2}
              />
              <Text fontSize="lg" color="gray.300">
                {lessonCompletion}%
              </Text>
            </Box>
          </Box>
        </VStack>

        <Box
          w="70%"
          p={6}
          bg="#2c1e4b"
          borderRadius="lg"
          boxShadow="md"
          color="white"
        >
          <Text fontWeight="bold" fontSize="2xl" mb={4}>
            User Progress
          </Text>
          {userProgress ? (
            <Accordion allowMultiple>
              {Object.values(userProgress).map((course, courseIndex) => (
                <AccordionItem key={courseIndex} border="none">
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "#3b2763", color: "white" }}
                      transition="background-color 0.2s ease-in-out"
                    >
                      <Box flex="1" textAlign="left" fontWeight="bold" color="teal.300">
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
                                _expanded={{ bg: "#45357a", color: "white" }}
                                transition="background-color 0.2s ease-in-out"
                              >
                                <Box flex="1" textAlign="left" fontWeight="bold" color="yellow.300">
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
                                      bg="#1b1133"
                                      boxShadow="lg"
                                      color="gray.100"
                                      width="100%"
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
                                <Text color="gray.400">No assignments completed yet.</Text>
                              )}
                            </AccordionPanel>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <Text>No lessons completed yet.</Text>
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
