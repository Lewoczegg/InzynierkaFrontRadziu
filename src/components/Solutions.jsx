import { Box, Text, Button, Flex, VStack, Spinner, Center, Alert, AlertIcon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchSolutionsByAssignmentId } from "../api";

const Solutions = ({ assignmentId }) => {
  const [solutions, setSolutions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSolutions = async () => {
      try {
        setLoading(true);
        const solutionsData = await fetchSolutionsByAssignmentId(assignmentId);
        setSolutions(solutionsData);

        if (solutionsData.length > 0) {
          setSelectedLanguage(solutionsData[0].language);
        }
      } catch (err) {
        setError("Failed to fetch solutions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getSolutions();
  }, [assignmentId]);

  if (loading) {
    return (
      <Center height="100%">
        <Spinner size="lg" color="teal.400" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="100%">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  const selectedSolution = solutions.find(
    (solution) => solution.language.toLowerCase() === selectedLanguage?.toLowerCase()
  );

  return (
    <Box
      color="gray.300"
    >
      <Flex mb={6} flexWrap="wrap" gap={4}>
        {solutions.map((solution) => (
          <Button
            key={solution.solutionId}
            colorScheme={selectedLanguage?.toLowerCase() === solution.language.toLowerCase() ? "teal" : "gray"}
            variant={selectedLanguage?.toLowerCase() === solution.language.toLowerCase() ? "solid" : "outline"}
            onClick={() => setSelectedLanguage(solution.language)}
            size="md"
          >
            {solution.language}
          </Button>
        ))}
      </Flex>

      {selectedSolution ? (
        <VStack align="start" spacing={6} w="100%">
          <Box
            w="100%"
            p={6}
            bg="#2c1e4b"
            borderRadius="lg"
            boxShadow="md"
            color="gray.100"
          >
            <Text fontWeight="bold" mb={4}>
              Selected Solution in {selectedLanguage}:
            </Text>
            <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", color: "#c3c3c3" }}>
              {selectedSolution.content}
            </pre>
          </Box>
        </VStack>
      ) : (
        <Center>
          <Alert status="warning" w="100%" borderRadius="md" bg="#1b1133" boxShadow="md">
            <AlertIcon color="yellow.400" />
            <Text fontSize="lg" color="yellow.300" fontWeight="bold">
              No solution available for the selected language.
            </Text>
          </Alert>
        </Center>
      )}
    </Box>
  );
};

export default Solutions;
