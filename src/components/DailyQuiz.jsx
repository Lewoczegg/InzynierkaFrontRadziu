import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Spinner, Center, RadioGroup, Radio, Button, Stack } from '@chakra-ui/react';
import { fetchDailyQuiz, submitQuizResult } from '../api';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function DailyQuiz() {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const getLocalISOString = () => {
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const localTime = new Date(now.getTime() - offsetMs);
    return localTime.toISOString().slice(0, -1);
  };
  useEffect(() => {
    const getQuiz = async () => {
      try {
        setLoading(true);
        const data = await fetchDailyQuiz();

        if (data.message && data.message === "done") {
          setAlreadyDone(true);
        } else {
          setQuiz(data);
          setStartTime(getLocalISOString());
        }
      } catch (err) {
        setError('Failed to fetch the daily quiz. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getQuiz();
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = async () => {
    const userAnswers = quiz.questions.map(
      (question) => answers[question.questionId] || "No answer provided"
    );

    const requestBody = {
      quizId: quiz.quizId,
      startTime: startTime,
      userAnswer: userAnswers,
    };

    try {
      const result = await submitQuizResult(requestBody);
      toast({
        title: "Quiz Submitted",
        description: `Your answers have been submitted successfully! You scored ${result.points} points.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Center height="100%">
        <Spinner size="xl" color="white" />
      </Center>
    );
  }

  if (alreadyDone) {
    return (
      <Box
        height="80vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="gray.800"
      >
        <Box
          p={6}
          bgGradient="linear(to-r,rgb(185, 221, 255),rgb(230, 245, 255))"
          borderRadius="lg"
          boxShadow="0px 6px 15px rgba(0, 0, 0, 0.1)"
          width={{ base: "90%", md: "70%", lg: "50%" }}
          maxWidth="600px"
          textAlign="center"
        >
          <Text fontSize="2xl" fontWeight="bold" color="teal.600">
            Daily Quiz Already Completed
          </Text>
          <Text fontSize="lg" mt={4} color="gray.700">
            You have already completed the daily quiz. Check back tomorrow for a new quiz!
          </Text>
        </Box>
      </Box>
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
      p={4}
      bgGradient="linear(to-b, #f5f7fa, #e2ebf0)"
      mt={5}
      borderRadius="md"
      color="gray.800"
    >
      <Text fontSize="2xl" mb={4} fontWeight="bold">
        {quiz.title}
      </Text>
      <VStack align="start" spacing={6}>
        {quiz.questions.map((question) => (
          <Box
            key={question.questionId}
            w="100%"
            p={4}
            bgGradient="linear(to-r, #e9eff5, #cfd9df)"
            borderRadius="md"
            boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
          >
            <Text mb={2} fontSize="large" fontWeight="bold" color="teal.600">
              {question.content}
            </Text>
            <RadioGroup
              onChange={(value) => handleAnswerChange(question.questionId, value)}
              value={answers[question.questionId]}
            >
              <Stack direction="column" spacing={4}>
                {question.options.map((option, index) => (
                  <Radio
                    key={index}
                    value={option}
                    colorScheme="teal"
                    size="md"
                    borderWidth="2px"
                    borderColor="gray.400"
                    _checked={{
                      borderColor: "teal.600",
                      bg: "teal.400",
                      color: "white",
                    }}
                    _hover={{
                      borderColor: "teal.500",
                    }}
                  >
                    {option}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Box>
        ))}
      </VStack>

      <Button
        bgGradient="linear(to-r, #2a7a69, #56c1aa)"
        color="white"
        _hover={{ bgGradient: "linear(to-r, #20775c, #4da08f)" }}
        _active={{ bgGradient: "linear(to-r, #1f6c55, #479d89)" }}
        size="lg"
        mt={6}
        width="100%"
        borderRadius="md"
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
        onClick={handleSubmit}
      >
        Submit Quiz
      </Button>

    </Box>
  );
}

export default DailyQuiz;
