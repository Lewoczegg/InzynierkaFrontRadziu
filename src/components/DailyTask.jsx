import { Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchDailyTaskById } from "../api"; // Importujemy nowe API

const DailyTask = ({ taskId }) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDailyTask = async () => {
      try {
        setLoading(true);
        const taskData = await fetchDailyTaskById(taskId); // Pobieramy dane zadania codziennego
        setTask(taskData);
      } catch (err) {
        setError("Failed to fetch daily task. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getDailyTask();
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
    <Box w="100%" p={2} borderRadius="md">
      <Tabs variant="soft-rounded" colorScheme="purple" >
        <TabList ml="4">
          <Tab color="#b3b3b3" _selected={{ color: "white", bg: "#5a67d8" }}>
            Problem
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* Box, który zawiera tytuł i opis zadania */}
            <Box p={6} borderWidth="1px" borderRadius="md" bg="#1e1e1e" color="#f5f5f5" boxShadow="lg">
              {task ? (
                <>
                  <Text fontSize="2xl" mb={4} fontWeight="bold" color="#ffffff">
                    {task.title}
                  </Text>
                  {/* Formatowanie opisu z podziałem na linie */}
                  <Text fontSize="md" mb={4} color="#e2e2e2">
                    {task.description.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </Text>
                </>
              ) : (
                <Text color="red.500">Task data not available</Text>
              )}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default DailyTask;
