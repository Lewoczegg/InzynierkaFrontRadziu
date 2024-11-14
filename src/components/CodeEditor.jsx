import { Flex, Box, Button, Text, Textarea, Tab, TabList, TabPanel, TabPanels, Tabs, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useRef } from "react";
import { useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = ({ taskId, isDailyTask, startTime }) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("java");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box w="100%">
      <HStack spacing={4}>
        <Box w={'100%'}>
          <LanguageSelector language={language} onSelect={onSelect} />

          <Editor
            height="67vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />

          <Box mt={4} mb={2} p={4} bg="#1e1e1e" borderRadius="md" boxShadow="md" minH="100px">
            <Output editorRef={editorRef} language={language} taskId={taskId} isDailyTask={isDailyTask} startTime={startTime} />
          </Box>
        </Box>
      </HStack>
    </Box>
  );
}

export default CodeEditor;
