import React, { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import styled from 'styled-components';
import { Box, Spinner, Center, Text } from '@chakra-ui/react';
import CodeEditor from './CodeEditor';
import DailyTask from './DailyTask';
import { fetchDailyTask } from '../api';

function DailyTaskEditor() {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const getLocalISOString = () => {
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const localTime = new Date(now.getTime() - offsetMs);
    return localTime.toISOString().slice(0, -1);
  };
  useEffect(() => {
    const getDailyTask = async () => {
      try {
        setLoading(true);
        const taskData = await fetchDailyTask();

        if (taskData.message && taskData.message === "done") {
          setAlreadyDone(true);
        } else {
          setStartTime(getLocalISOString());
          setTask(taskData);
        }


      } catch (err) {
        setError('Failed to fetch the daily task. Please try again later.');
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

  if (alreadyDone) {
    return (
      <Box
        height="80vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="gray.800"
      >
        <Box
          p={6}
          bgGradient="linear(to-r,rgb(185, 221, 255),rgb(230, 245, 255))"
          borderRadius="lg"
          boxShadow="0px 6px 15px rgba(0, 0, 0, 0.1)"
          width={{ base: "90%", md: "70%", lg: "50%" }}
          maxWidth="600px"
          textAlign="center"
        >
          <Text fontSize="2xl" fontWeight="bold" color="teal.600">
            Daily Task Already Completed
          </Text>
          <Text fontSize="lg" mt={4} color="gray.600">
            You have already completed the daily task. Check back tomorrow for a new task!
          </Text>
        </Box>
      </Box>
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
    <Box
      bgGradient="linear(to-b, #f5f7fa, #e9eff5)"
      color="gray.800"
      display="flex"
      flexDirection="column"
      overflow="hidden"
      mt={3}
      borderRadius="lg"
      boxShadow="lg"
    >
      <StyledSplitPane
        split="vertical"
        defaultSize="50%"
        minSize={530}
        maxSize={-530}
        primary="second"
        style={{ flex: 1, position: "relative" }}
      >
        <Box
          p={6}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          flex="1"
          display="flex"
          minWidth="0"
          height="100%"
          overflow="auto"
        >
          <DailyTask taskId={task.taskId} />
        </Box>

        <Box
          p={6}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          display="flex"
          minWidth="0"
          height="100%"
          overflow="auto"
        >
          <CodeEditor taskId={`Daily${task.taskId}`} isDailyTask={true} startTime={startTime} />
        </Box>
      </StyledSplitPane>
    </Box>

  );
}

export default DailyTaskEditor;

const StyledSplitPane = styled(SplitPane)`
  height: 100%;
  box-sizing: border-box;

  .Resizer {
    background: #56c1aa;
    z-index: 10;
    box-sizing: inherit;
    background-clip: padding-box;
    width: 10px;
    cursor: col-resize;
    transition: background 0.2s ease, width 0.2s ease;
    border-radius: 4px;
  }

  .Resizer:hover {
    background: #2a7a69;
    width: 12px;
  }

  .Resizer.vertical {
    width: 10px;
  }

  .Resizer.horizontal {
    height: 10px;
    cursor: row-resize;
  }

  .Resizer.disabled {
    cursor: not-allowed;
  }
`;

