import { Box, Button, Text, useToast, Tabs, TabList, TabPanels, Tab, TabPanel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Flex } from "@chakra-ui/react";
import { executeCode, submitAssignment, submitDailyTask, analyzeCodeRequest } from "../api";
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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [analyzeResult, setAnalyzeResult] = useState(null);

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
                            input: 'Undefined',
                            expected: 'Undefined',
                            actual: 'Undefined',
                            userOutput: 'Undefined'
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
                response = await submitDailyTask(taskId, sourceCode, language, startTime);
            } else {
                response = await submitAssignment(taskId, language, sourceCode);
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
    const analyzeCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) {
            toast({
                title: "No Code Provided",
                description: "Please provide code to analyze.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        try {
            setIsLoading(true);
            const result = await analyzeCodeRequest(sourceCode);
            const formattedResult = formatAnalysisResult(result.message);

            setAnalyzeResult(formattedResult);
            onOpen();
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: error.message || "An error occurred during code analysis",
                status: "error",
                duration: 6000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const formatAnalysisResult = (message) => {
        return message
            .split(/(?=\d+\.\s)/)
            .filter(item => item)
            .map(item => item.trim());
    };

    return (
        <Box w={'100%'} >
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Button
                        variant="solid"
                        bgGradient="linear(to-r, #2a7a69, #56c1aa)"
                        color="white"
                        _hover={{ bgGradient: "linear(to-r, #20775c, #4da08f)" }}
                        isLoading={isLoading}
                        onClick={runCode}
                    >
                        Run Code
                    </Button>
                    <Button
                        variant="solid"
                        bgGradient="linear(to-r, #6b46c1, #805ad5)"
                        color="white"
                        _hover={{ bgGradient: "linear(to-r, #553c9a, #6b46c1)" }}
                        ml={2}
                        isLoading={isLoading}
                        onClick={submitCode}
                    >
                        Submit
                    </Button>
                </Box>
                <Box>
                    <Button
                        variant="solid"
                        bgGradient="linear(to-r, #319795, #38b2ac)"
                        color="white"
                        _hover={{ bgGradient: "linear(to-r, #2c7a7b, #319795)" }}
                        ml={2}
                        isLoading={isLoading}
                        onClick={analyzeCode}
                    >
                        Analyze Code
                    </Button>
                    <Button
                        variant="solid"
                        bgGradient="linear(to-r, #805ad5, #9f7aea)"
                        color="white"
                        _hover={{ bgGradient: "linear(to-r, #6b46c1, #805ad5)" }}
                        ml={2}
                        onClick={onOpen}
                    >
                        View Analysis Result
                    </Button>
                </Box>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent bgGradient="linear(to-b, #f5f7fa, #e9eff5)" boxShadow="lg" borderRadius="lg" maxW="800px">
                    <ModalHeader color="teal.600">Code Analysis Result</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            {analyzeResult &&
                                analyzeResult.map((item, index) => (
                                    <Text key={index} color="gray.700" mb={4}>
                                        {item}
                                    </Text>
                                ))}
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {tests.length > 0 ? (
                <>
                    <Box mt={4} mb={2} ml={1}>
                        <Text fontSize="lg" fontWeight="bold" color={passPercentage === 100 ? "green.500" : "yellow.500"}>
                            {passPercentage}% Tests passed
                        </Text>
                    </Box>
                    <Tabs variant="soft-rounded" colorScheme="teal" mt={4}>
                        <TabList>
                            {tests.map((test, index) => (
                                <Tab key={index} color={test.status === "failed" ? "red.500" : "green.500"}>
                                    Test {index + 1}
                                </Tab>
                            ))}
                        </TabList>
                        <TabPanels>
                            {tests.map((test, index) => (
                                <TabPanel key={index}>
                                    <Box p={6} bgGradient="linear(to-r, #e9eff5, #cfd9df)" borderRadius="lg" boxShadow="md">
                                        <Box mb={4} p={4} bg="white" borderRadius="md" boxShadow="sm">
                                            <Text fontWeight="bold" mb={2} color="teal.600">
                                                Input:
                                            </Text>
                                            <Text color="gray.700">{test.input}</Text>
                                        </Box>

                                        <Box mb={4} p={4} bg="white" borderRadius="md" boxShadow="sm">
                                            <Text fontWeight="bold" mb={2} color="teal.600">
                                                Expected Result:
                                            </Text>
                                            <Text color="gray.700">{test.expected}</Text>
                                        </Box>

                                        <Box mb={4} p={4} bg="white" borderRadius="md" boxShadow="sm">
                                            <Text fontWeight="bold" mb={2} color="teal.600">
                                                Actual Result:
                                            </Text>
                                            <Text color="gray.700">{test.actual}</Text>
                                        </Box>

                                        <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
                                            <Text fontWeight="bold" mb={2} color="teal.600">
                                                User Output:
                                            </Text>
                                            <Text color="gray.700">{test.userOutput}</Text>
                                        </Box>
                                    </Box>
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
                </>
            ) : (
                <Text mt={4} color="gray.600">
                    The result will appear here after running the code.
                </Text>
            )}

        </Box>
    );
};
export default Output;
