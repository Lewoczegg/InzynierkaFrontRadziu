import React from 'react';
import SplitPane from 'react-split-pane';
import styled from 'styled-components';
import { Box } from '@chakra-ui/react'
import CodeEditor from './components/CodeEditor';
import MenuBar from './components/MenuBar';
import Assignment from './components/Assignment';

function App() {
  return (
    <Box
      minH="100vh"
      bg="#0f0a19"
      color="gray.500"
      display="flex"
      flexDirection="column"
      pt="60px"
      // Usuń padding z głównego kontenera
    >
      <MenuBar />
      <Box flex="1" display="flex" minH="0">
        <StyledSplitPane
          split="vertical"
          defaultSize="50%"
          minSize={440}
          maxSize={-440}
          primary="second"
          style={{ height: '92.5%' }}
        >
          {/* Lewa kolumna: Assignment */}
          <Box
            p={6}
            bg="#333"
            borderRadius="md"
            boxShadow="md"
            overflow="auto"
            display="flex"
            flex="1"
            minWidth="0"
            height="100%"
          >
            <Assignment />
          </Box>

          {/* Prawa kolumna: CodeEditor */}
          <Box
            p={6}
            bg="#2d2d2d"
            borderRadius="md"
            boxShadow="md"
            overflow="auto"
            display="flex"
            flex="1"
            minWidth="0"
            height="100%"
          >
            <CodeEditor />
          </Box>
        </StyledSplitPane>
      </Box>
    </Box>
  );
}

export default App;

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
