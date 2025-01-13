import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useRef, useEffect, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS, TASK_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = ({ taskId, isDailyTask, startTime }) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("java");

  useEffect(() => {
    if (TASK_SNIPPETS[taskId] && TASK_SNIPPETS[taskId][language]) {
      setValue(TASK_SNIPPETS[taskId][language]);
    } else {
      setValue(CODE_SNIPPETS[language]);
    }
  }, [taskId, language]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  return (
    <Box w="100%" bgGradient="linear(to-b, #f5f7fa, #e9eff5)" p={4} borderRadius="lg" boxShadow="lg">
      <HStack spacing={4}>
        <Box w={"100%"}>
          <LanguageSelector language={language} onSelect={onSelect} />

          <Editor
            height="67vh"
            theme="vs-white"
            language={language}
            defaultValue={value}
            onMount={onMount}
            value={value}
            onChange={(newValue) => setValue(newValue)}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorSmoothCaretAnimation: true,
            }}
            style={{
              borderRadius: "8px",
              border: "1px solid #d9dde3",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          />

          <Box mt={4} mb={2} p={4} bg="white" borderRadius="lg" boxShadow="md" minH="100px">
            <Output
              editorRef={editorRef}
              language={language}
              taskId={taskId}
              isDailyTask={isDailyTask}
              startTime={startTime}
            />
          </Box>
        </Box>
      </HStack>
    </Box>
  );
};

export default CodeEditor;
