import React, { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import styled from 'styled-components';
import { Box } from '@chakra-ui/react';
import CodeEditor from './CodeEditor';
import Assignment from './Assignment';
import { useParams } from 'react-router-dom';

function AssignmentEditor() {
  const { assignmentId } = useParams();
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    setTaskId(parseInt(assignmentId));
  }, [assignmentId]);

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
          minSize={530}
          maxSize={-530}
          primary="second"
          style={{ flex: 1, position: "relative" }}
        >
          <Box
            p={6}
            bgGradient="linear(to-b, #0f0a19, #1a1a40)"
            borderRadius="lg"
            boxShadow="lg"
            flex="1"
            display="flex"
            minWidth="0"
            height="100%" 
            overflow="auto"
          >
            <Assignment assignmentId={assignmentId} />
          </Box>

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
            <CodeEditor taskId={taskId} isDailyTask={false} startTime={""} />
          </Box>
        </StyledSplitPane>
    </Box>
  );
}

export default AssignmentEditor;

const StyledSplitPane = styled(SplitPane)`
  height: 100%;
  box-sizing: border-box;
  
  .Resizer {
    background: #5a67d8;
    z-index: 10;
    box-sizing: inherit;
    background-clip: padding-box;
    width: 10px;
    cursor: col-resize;
    transition: background 0.2s ease, width 0.2s ease;
  }

  .Resizer:hover {
    background: #4c51bf;
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
