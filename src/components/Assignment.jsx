import { Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchAssignmentById } from "../api"; // Importujemy funkcję do pobierania assignmentu po id
import Solutions from "./Solutions";

const Assignment = ({ assignmentId }) => {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <Box w="100%" p={1} bg="#333" borderRadius="md">
      <Tabs variant="soft-rounded" colorScheme="white">
        <TabList>
          <Tab color="#A3A3A3" _selected={{ color: "white", bg: "gray" }}>
            Problem
          </Tab>
          <Tab color="#A3A3A3" _selected={{ color: "white", bg: "gray" }}>
            Solutions
          </Tab>
          <Tab color="#A3A3A3" _selected={{ color: "white", bg: "gray" }}>
            Grade
          </Tab>
          <Tab color="#A3A3A3" _selected={{ color: "white", bg: "gray" }}>
            Feedback
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box p={4} borderWidth="1px" borderRadius="md">
              {assignment ? (
                <>
                  <Text fontSize="lg" mb={4} fontWeight="bold">
                    {assignment.title}
                  </Text>
                  <Text fontSize="md" mb={4}>
                    {assignment.description}
                  </Text>
                </>
              ) : (
                <Text>Assignment data not available</Text>
              )}
            </Box>
          </TabPanel>
          <TabPanel>
            <Solutions assignmentId={assignmentId} />
          </TabPanel>
          <TabPanel>
            <Box p={4} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold">Grade</Text>
              <Text mb={2}>Grade: 100%</Text>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box p={4} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold">Feedback</Text>
              <Text mb={2}>Great job!</Text>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Assignment;
