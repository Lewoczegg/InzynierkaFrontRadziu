import { Box, Text, VStack, HStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Spinner, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchUserInfo, fetchUserProgress } from "../api";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [loadingUserProgress, setLoadingUserProgress] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Pobieranie informacji o użytkowniku
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

    // Pobieranie postępu użytkownika
    const getUserProgress = async () => {
      try {
        const data = await fetchUserProgress();
        setUserProgress(data);
      } catch (err) {
        setError("Failed to fetch user progress. Please try again later.");
      } finally {
        setLoadingUserProgress(false);
      }
    };

    getUserInfo();
    getUserProgress();
  }, []);

  if (loadingUserInfo || loadingUserProgress) {
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
    <Box w="100%" p={4}>
      <HStack align="start" spacing={8} w="100%">
        {/* Lewa strona: Dane użytkownika */}
        <Box w="30%" p={4} borderWidth="1px" borderRadius="md" bg="#1e1e1e" color="white">
          <Text fontWeight="bold" fontSize="2xl" mb={4}>
            User Information
          </Text>
          {userInfo ? (
            <VStack align="start" spacing={2}>
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

        {/* Prawa strona: Progres użytkownika */}
        <Box w="70%" p={4} borderWidth="1px" borderRadius="md" bg="#2d2d2d" color="white">
          <Text fontWeight="bold" fontSize="2xl" mb={4}>
            User Progress
          </Text>
          {userProgress ? (
            <Accordion allowMultiple>
              {Object.values(userProgress).map((course, courseIndex) => (
                <AccordionItem key={courseIndex}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left" fontWeight="bold" color="blue.400">
                        {course.courseTitle}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {course.lessons.length > 0 ? (
                      <Accordion allowMultiple>
                        {course.lessons.map((lesson, lessonIndex) => (
                          <AccordionItem key={lessonIndex}>
                            <h2>
                              <AccordionButton>
                                <Box flex="1" textAlign="left" fontWeight="bold" color="yellow.400">
                                  {lesson.lessonTitle}
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              {lesson.assignments.length > 0 ? (
                                <VStack align="start" spacing={4}>
                                  {lesson.assignments.map((assignment, assignmentIndex) => (
                                    <Box key={assignmentIndex} p={4} borderWidth="1px" borderRadius="md" bg="#333">
                                      <Text><b>Assignment:</b> {assignment.assignmentTitle}</Text>
                                      <Text><b>Grade:</b> {assignment.submission.grade}%</Text>
                                      <Text><b>Submitted At:</b> {new Date(assignment.submission.submittedAt).toLocaleString()}</Text>
                                    </Box>
                                  ))}
                                </VStack>
                              ) : (
                                <Text>No assignments completed yet.</Text>
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


