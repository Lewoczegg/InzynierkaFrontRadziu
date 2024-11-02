import { Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Center, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchAssignmentById, fetchLatestSubmission } from "../api"; // Importujemy nowe API
import Solutions from "./Solutions";

const Assignment = ({ assignmentId }) => {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latestSubmission, setLatestSubmission] = useState(null);
  const [submissionLoading, setSubmissionLoading] = useState(true);
  const [submissionError, setSubmissionError] = useState(false);

  useEffect(() => {
    const getAssignment = async () => {
      try {
        setLoading(true);
        const assignmentData = await fetchAssignmentById(assignmentId); // Pobieramy dane assignmentu na podstawie id
        setAssignment(assignmentData);
      } catch (err) {
        setError("Failed to fetch assignment. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getAssignment();
  }, [assignmentId]);

  useEffect(() => {
    const getLatestSubmission = async () => {
      try {
        setSubmissionLoading(true);
        const submissionData = await fetchLatestSubmission(assignmentId); // Pobieramy dane najnowszego przesłania, przesyłając `taskId` w body
        setLatestSubmission(submissionData);
      } catch (err) {
        setSubmissionError(true);
      } finally {
        setSubmissionLoading(false);
      }
    };

    getLatestSubmission();
  }, [assignmentId]);

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
    <Box w="100%" p={2} borderRadius="md">
      <Tabs variant="soft-rounded" colorScheme="purple" >
        <TabList ml="4">
          <Tab color="#b3b3b3" _selected={{ color: "white", bg: "#5a67d8" }}>
            Problem
          </Tab>
          <Tab color="#b3b3b3" _selected={{ color: "white", bg: "#5a67d8" }}>
            Solutions
          </Tab>
          <Tab color="#b3b3b3" _selected={{ color: "white", bg: "#5a67d8" }}>
            Grade
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* Box, który zawiera tytuł i opis zadania */}
            <Box p={6} borderWidth="1px" borderRadius="md" bg="#1e1e1e" color="#f5f5f5" boxShadow="lg">
              {assignment ? (
                <>
                  <Text fontSize="2xl" mb={4} fontWeight="bold" color="#ffffff">
                    {assignment.title}
                  </Text>
                  {/* Formatowanie opisu z podziałem na linie */}
                  <Text fontSize="md" mb={4} color="#e2e2e2">
                    {assignment.description.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </Text>
                </>
              ) : (
                <Text color="red.500">Assignment data not available</Text>
              )}
            </Box>
          </TabPanel>
          <TabPanel>
            <Solutions assignmentId={assignmentId} />
          </TabPanel>
          <TabPanel>
            {submissionLoading ? (
              <Center height="100%">
                <Spinner size="md" color="white" />
              </Center>
            ) : submissionError || !latestSubmission ? (
              <Box w="100%" p={4} textAlign="center">
                <Text fontSize="xl" color="yellow.500" fontWeight="bold">
                  Zadanie jeszcze nie zgłoszone
                </Text>
              </Box>
            ) : (
              <VStack align="start" spacing={4} w="100%">
                {/* Box dla Grade */}
                <Box w="100%" p={4} borderWidth="1px" borderRadius="md" bg="#48bb78" color="white">
                  <Text fontSize="2xl" fontWeight="bold">
                    Grade: {latestSubmission.grade}
                  </Text>
                </Box>

                {/* Box dla Content */}
                <Box w="100%" p={4} bg="#1e1e1e" borderRadius="md" overflow="auto">
                  <Text fontWeight="bold" mb={2} color="white">
                    Solution Code:
                  </Text>
                  <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", color: "#c3c3c3" }}>
                    {latestSubmission.content}
                  </pre>
                </Box>
              </VStack>
            )}
          </TabPanel>

        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Assignment;



