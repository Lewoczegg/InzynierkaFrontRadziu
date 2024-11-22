import { Box, Button, Text, useToast, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { executeCode, submitAssignment, submitDailyTask } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Output = ({ editorRef, language, taskId, isDailyTask, startTime }) => {
    const toast = useToast();
    const [tests, setTests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [passPercentage, setPassPercentage] = useState(0);
    const [passedTests, setPassedTests] = useState(0);
    const [totalTests, setTotalTests] = useState(0);
    const navigate = useNavigate();

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) {
            return;
        }
        try {
            setIsLoading(true);
            const { result } = await executeCode(language, sourceCode, taskId);

            if (result.success) {
                setIsError(false);
                const outputLines = result.output.trim().split('\n');

                if (outputLines[outputLines.length - 1].includes('All tests') || outputLines[outputLines.length - 1].includes('Some tests failed')) {
                    outputLines.pop();
                }

                const userOutputLines = result.userOutput ? result.userOutput.trim().split('\n') : [];

                const tests = outputLines.map((line) => {
                    const regexPassed = /Test passed for input: (.+)\. Result: (.+)/;
                    const regexFailed = /Test failed for input: (.+)\. Expected: (.+), but got: (.+)/;
                    const matchPassed = line.match(regexPassed);
                    const matchFailed = line.match(regexFailed);

                    if (matchPassed) {
                        const [, inputValue, resultValue] = matchPassed;
                        return {
                            status: 'passed',
                            input: inputValue,
                            expected: resultValue,
                            actual: resultValue,
                            userOutput: userOutputLines || 'No data'
                        };
                    } else if (matchFailed) {
                        const [, inputValue, expectedValue, actualValue] = matchFailed;
                        return {
                            status: 'failed',
                            input: inputValue,
                            expected: expectedValue,
                            actual: actualValue,
                            userOutput: userOutputLines || 'No data'
                        };
                    } else {
                        return {
                            status: 'unknown',
                            input: 'Nieznane',
                            expected: 'Nieznane',
                            actual: 'Nieznane',
                            userOutput: 'Nieznane'
                        };
                    }
                });

                setTests(tests);
                const passedTestsCount = tests.filter(test => test.status === 'passed').length;
                const totalTestsCount = tests.length;
                const passPercentageValue = Math.round((passedTestsCount / totalTestsCount) * 100);

                setPassedTests(passedTestsCount);
                setTotalTests(totalTestsCount);
                setPassPercentage(passPercentageValue);
            } else {
                setIsError(true);
                toast({
                    title: "Error",
                    description: result.output || "An error occurred",
                    status: "error",
                    duration: 6000,
                    isClosable: true,
                });
                const outputLines = result.output.trim().split('\n');
                const outputFailCompilation = result.output ? result.output.trim().split('\n') : [];
                const tests = outputLines.map(() => {
                    return {
                        status: 'failed',
                        input: "Error",
                        expected: "error",
                        actual: "error",
                        userOutput: outputFailCompilation || 'No data'
                    };
                });
                setTests(tests);
                const passedTestsCount = tests.filter(test => test.status === 'passed').length;
                const totalTestsCount = tests.length;
                const passPercentageValue = Math.round((passedTestsCount / totalTestsCount) * 100);

                setPassedTests(passedTestsCount);
                setTotalTests(totalTestsCount);
                setPassPercentage(passPercentageValue);
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: error.message || "An error occurred",
                status: "error",
                duration: 6000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const submitCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) {
            return;
        }
        try {
            setIsLoading(true);
            let response;
            if (isDailyTask) {
                response  = await submitDailyTask(taskId, sourceCode, language, startTime);
              } else {
                response  = await submitAssignment(taskId, language, sourceCode);
              }

            const { result } = response;

            if (result.success) {
                toast({
                    title: "Submit",
                    description: "Code submitted successfully!",
                    status: "success",
                    duration: 6000,
                    isClosable: true,
                });
                if (isDailyTask) {
                    navigate("/");
                  } else {
                    navigate("/assignments");
                  }
                
            } else {
                toast({
                    title: "Error",
                    description: result.output || "An error occurred",
                    status: "error",
                    duration: 6000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: error.response?.data?.message || "An error occurred",
                status: "error",
                duration: 6000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box w={'100%'} >
            <Button variant='outline' colorScheme='blue' mb={4} isLoading={isLoading} onClick={runCode}>
                Run code
            </Button>
            <Button variant='outline' colorScheme='blue' bg="#4caf50" color="white" _hover={{ bg: "#45a049" }} mb={4} ml={2} isLoading={isLoading} onClick={submitCode}>
                Submit
            </Button>
            {tests.length > 0 ? (
                <>
                    <Box mt={4} mb={2} ml={1} w={'100%'}>
                        <Text fontSize="lg" fontWeight="bold" color={passPercentage === 100 ? 'green.500' : 'yellow.500'}>
                            {passPercentage}% Tests passed
                        </Text>
                    </Box>
                    <Tabs variant='soft-rounded' colorScheme='gray' mt={4}>
                        <TabList>
                            {tests.map((test, index) => (
                                <Tab key={index} color={test.status === 'failed' ? 'red.500' : 'green.500'}>
                                    Test {index + 1}
                                </Tab>
                            ))}
                        </TabList>
                        <TabPanels>
                            {tests.map((test, index) => (
                                <TabPanel key={index}>
                                    <Box p={6} bg="#2c1e4b" borderRadius="lg" boxShadow="md">
                                        <Box mb={4} p={4} bg="#1b1133" borderRadius="md">
                                            <Text fontWeight="bold" mb={2}>Input:</Text>
                                            <Text>{test.input}</Text>
                                        </Box>

                                        <Box mb={4} p={4} bg="#1b1133" borderRadius="md">
                                            <Text fontWeight="bold" mb={2}>Expected Result:</Text>
                                            <Text>{test.expected}</Text>
                                        </Box>

                                        <Box mb={4} p={4} bg="#1b1133" borderRadius="md">
                                            <Text fontWeight="bold" mb={2}>Actual Result:</Text>
                                            <Text>{test.actual}</Text>
                                        </Box>

                                        <Box p={4} bg="#1b1133" borderRadius="md">
                                            <Text fontWeight="bold" mb={2}>User Output:</Text>
                                            <Text>{test.userOutput}</Text>
                                        </Box>
                                    </Box>
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
                </>
            ) : (
                <Text mt={4}>The result will appear here after running the code.</Text>
            )}
        </Box>
    );
};
export default Output;
