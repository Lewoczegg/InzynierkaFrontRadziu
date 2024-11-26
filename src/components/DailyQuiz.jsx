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
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-b, #0f0a19, #1a1a40)"
        color="gray.300"
      >
        <Box
          p={6}
          bg="#1b1133"
          borderRadius="lg"
          boxShadow="xl"
          width={{ base: "90%", md: "70%", lg: "50%" }}
          maxWidth="600px"
          textAlign="center"
        >
          <Text fontSize="2xl" fontWeight="bold" color="yellow.400">
            Daily Quiz Already Completed
          </Text>
          <Text fontSize="lg" mt={4} color="gray.200">
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
    <Box p={4} bgGradient="linear(to-b, #0f0a19, #1a1a40)" mt={5} borderRadius="md" color="white">
      <Text fontSize="2xl" mb={4} fontWeight="bold">
        {quiz.title}
      </Text>
      <VStack align="start" spacing={6}>
        {quiz.questions.map((question) => (
          <Box key={question.questionId} w="100%" p={4} bg="#1b1133" borderRadius="md">
            <Text mb={2} fontWeight="bold">
              {question.content}
            </Text>
            <RadioGroup
              onChange={(value) => handleAnswerChange(question.questionId, value)}
              value={answers[question.questionId]}
            >
              <Stack direction="column">
                {question.options.map((option, index) => (
                  <Radio key={index} value={option}>
                    {option}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Box>
        ))}
      </VStack>
      <Button colorScheme="teal" size="lg" mt={6} onClick={handleSubmit}>
        Submit Quiz
      </Button>
    </Box>
  );
}

export default DailyQuiz;
