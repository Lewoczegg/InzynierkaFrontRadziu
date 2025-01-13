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
      <Assignment assignmentId={assignmentId} />
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

