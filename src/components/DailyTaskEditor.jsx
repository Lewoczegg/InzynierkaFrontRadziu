import React, { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import styled from 'styled-components';
import { Box, Spinner, Center, Text } from '@chakra-ui/react';
import CodeEditor from './CodeEditor';
import MenuBar from './MenuBar';
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
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-b, #0f0a19, #1a1a40)"
        color="gray.300"
      >
        <Box
          p={6}
          bg="#1b1133"
          borderRadius="lg"
          boxShadow="xl"
          width={{ base: "90%", md: "70%", lg: "50%" }}
          maxWidth="600px"
          textAlign="center"
        >
          <Text fontSize="2xl" fontWeight="bold" color="yellow.400">
            Dzisiaj task został zrobiony.
          </Text>
          <Text fontSize="lg" mt={4} color="gray.200">
            Spróbuj ponownie jutro, aby rozwiązać kolejny task i zdobyć więcej punktów!
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
    bgGradient="linear(to-b, #0f0a19, #1a1a40)"
    color="gray.300"
    display="flex"
    flexDirection="column"
    overflow="hidden"
    mt={3}
    >
        <StyledSplitPane
          split="vertical"
          defaultSize="50%"
          minSize={460}
          maxSize={-460}
          primary="second"
          style={{ flex: 1, position: "relative" }}
        >
          {/* Lewa kolumna: Assignment */}
          <Box
            p={6}
            bgGradient="linear(to-b, #0f0a19, #1a1a40)"
            borderRadius="lg"
            boxShadow="lg"
            display="flex"
            minWidth="0"
            height="100%" 
            overflow="auto"
          >
            <DailyTask taskId={task.taskId}/>
          </Box>

          {/* Prawa kolumna: CodeEditor */}
          <Box
            p={6}
            bgGradient="linear(to-b, #0f0a19, #1a1a40)"
            borderRadius="lg"
            boxShadow="lg"
            display="flex"
            minWidth="0"
            height="100%" 
            overflow="auto"
            
          >
            <CodeEditor taskId={`Daily${task.taskId}`} isDailyTask={true} startTime={startTime}/>
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
    background: #5a67d8; // Stylizacja separatora na kolor pasujący do aplikacji
    z-index: 10;
    box-sizing: inherit;
    background-clip: padding-box;
    width: 10px;
    cursor: col-resize;
    transition: background 0.2s ease, width 0.2s ease;
  }

  .Resizer:hover {
    background: #4c51bf;
    width: 12px; // Subtelny efekt powiększenia podczas najechania myszką
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
