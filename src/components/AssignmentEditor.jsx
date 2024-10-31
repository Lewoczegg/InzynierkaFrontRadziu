import React, { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import styled from 'styled-components';
import { Box } from '@chakra-ui/react';
import CodeEditor from './CodeEditor';
import MenuBar from './MenuBar';
import Assignment from './Assignment';
import { useParams } from 'react-router-dom';

function AssignmentEditor() {
  const { assignmentId } = useParams(); // Pobieranie id assignment z URL
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    setTaskId(parseInt(assignmentId));
  }, [assignmentId]);

  return (
    <Box
    //   minH="100vh"
      bg="#0f0a19"
      color="gray.500"
      display="flex"
      flexDirection="column"
    //   pt="50px"
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
            <Assignment assignmentId={assignmentId} />
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
            <CodeEditor taskId={taskId} />
          </Box>
        </StyledSplitPane>
      </Box>
    </Box>
  );
}

export default AssignmentEditor;

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
