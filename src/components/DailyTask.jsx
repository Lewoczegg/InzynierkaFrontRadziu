import { Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchDailyTaskById } from "../api";

const DailyTask = ({ taskId }) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDailyTask = async () => {
      try {
        setLoading(true);
        const taskData = await fetchDailyTaskById(taskId);
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
        <Spinner size="xl" color="teal.400" />
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
    <Box w="100%" p={4} borderRadius="lg" >
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList ml="4">
          <Tab
            color="gray.600"
            _selected={{ color: "white", bgGradient: "linear(to-r, #2a7a69, #316fa8)" }}
          >
            Problem
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box
              bgGradient="linear(to-r, #e9eff5, #cfd9df)"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              color="gray.800"
              mb={6}
            >
              {task ? (
                <>
                  <Text fontSize="2xl" mb={4} fontWeight="bold" color="teal.600">
                    {task.title}
                  </Text>
                  <Text fontSize="md" mb={4} color="gray.700">
                    {task.description.split("\n").map((line, index) => (
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
