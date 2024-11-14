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
  const [startTime, setStartTime] = useState("");
  const [alreadyDone, setAlreadyDone] = useState(false);

  useEffect(() => {
    const getDailyTask = async () => {
      try {
        setLoading(true);
        const taskData = await fetchDailyTask();

        if (taskData.message && taskData.message === "done") {
          setAlreadyDone(true);
        } else {
          setStartTime(new Date().toISOString());
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
      <Center height="100%">
        <Text fontSize="xl" color="yellow.400">
          Dzisiaj task został zrobiony. Spróbuj ponownie jutro!
        </Text>
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
    <Box
      bg="#0f0a19"
      color="gray.500"
      display="flex"
      flexDirection="column"
    >
      <MenuBar />
      <Box flex="1" display="flex">
        <StyledSplitPane
          split="vertical"
          defaultSize="50%"
          minSize={440}
          maxSize={-440}
          primary="second"
          style={{ height: '93.5%' }}
        >
          {/* Lewa kolumna: Assignment */}
          <Box
            p={4}
            bg="#333"
            borderRadius="md"
            boxShadow="md"
            overflow="auto"
            display="flex"
            flex="1"
            minWidth="0"
            height="100%"
          >
            <DailyTask taskId={task.taskId}/>
          </Box>

          {/* Prawa kolumna: CodeEditor */}
          <Box
            p={4}
            bg="#2d2d2d"
            borderRadius="md"
            boxShadow="md"
            overflow="auto"
            display="flex"
            flex="1"
            minWidth="0"
            height="100%"
          >
            <CodeEditor taskId={`Daily${task.taskId}`} isDailyTask={true} startTime={startTime}/>
          </Box>
        </StyledSplitPane>
      </Box>
    </Box>
  );
}

export default DailyTaskEditor;

const StyledSplitPane = styled(SplitPane)`
  height: 100%;
  box-sizing: border-box;

  .Resizer {
    background: #ccc;
    z-index: 10;
    box-sizing: inherit;
    background-clip: padding-box;
    width: 10px;
    cursor: col-resize;
    transition: background 0.2s ease;
  }

  .Resizer:hover {
    background: #888;
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
