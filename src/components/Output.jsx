import { Box, Button, Text, useToast, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { executeCode } from "../api";
import { useState } from "react";

const Output = ({ editorRef, language, taskId }) => {
    const toast = useToast();
    const [tests, setTests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [passPercentage, setPassPercentage] = useState(0);
    const [passedTests, setPassedTests] = useState(0);
    const [totalTests, setTotalTests] = useState(0);

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) {
            return;
        }
        try {
            setIsLoading(true);
            const { result } = await executeCode(language, sourceCode, taskId); // Przekazywanie dynamicznego `taskId`

            if (result.success) {
                setIsError(false);
                const outputLines = result.output.trim().split('\n');

                // Usuwamy ostatnią linię jeśli jest podsumowaniem
                if (outputLines[outputLines.length - 1].includes('All tests') || outputLines[outputLines.length - 1].includes('Some tests failed')) {
                    outputLines.pop();
                }

                const userOutputLines = result.userOutput ? result.userOutput.trim().split('\n') : [];

                const tests = outputLines.map((line) => {
                    // Sprawdzamy, czy test przeszedł czy nie
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

    return (
        <Box w={'100%'}>
            <Button variant='outline' colorScheme='blue' mb={4} isLoading={isLoading} onClick={runCode}>
                Run code
            </Button>
            <Button variant='outline' colorScheme='blue' bg="#4caf50" color="white" _hover={{ bg: "#45a049" }} mb={4} ml={2}>
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
                                    <Box p={4} borderWidth="1px" borderRadius="md">
                                        <Text fontWeight="bold">
                                            Status: <Text as="span" color={test.status === 'failed' ? 'red.500' : 'green.500'}>
                                                {test.status === 'failed' ? 'Failed' : 'Passed'}
                                            </Text>
                                        </Text>
                                        <Text fontWeight="bold">Input:</Text>
                                        <Text mb={2}>{test.input}</Text>

                                        <Text fontWeight="bold">Expected Result:</Text>
                                        <Text mb={2}>{test.expected}</Text>

                                        <Text fontWeight="bold">Actual Result:</Text>
                                        <Text mb={2}>{test.actual}</Text>

                                        <Text fontWeight="bold">User Output:</Text>
                                        <Text mb={2}>{test.userOutput}</Text>
                                    </Box>
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
                </>
            ) : (
                <Text mt={4}>Tutaj pojawi się wynik po uruchomieniu kodu.</Text>
            )}
        </Box>
    );
};
export default Output;
