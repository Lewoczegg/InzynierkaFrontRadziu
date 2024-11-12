import { Box, Text, Button, Flex, VStack } from "@chakra-ui/react";
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
      <Box w="100%" textAlign="center" py={10}>
        <Text fontSize="lg" color="gray.500">
          Loading solutions...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box w="100%" textAlign="center" py={10}>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  const selectedSolution = solutions.find(
    (solution) => solution.language.toLowerCase() === selectedLanguage?.toLowerCase()
  );

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="#1e1e1e" color="white">
      <Text fontWeight="bold" fontSize="xl" mb={4}>
        Solutions
      </Text>

      <Flex mb={4} flexWrap="wrap">
        {solutions.map((solution) => (
          <Button
            key={solution.solutionId}
            colorScheme={selectedLanguage?.toLowerCase() === solution.language.toLowerCase() ? "blue" : "gray"}
            variant={selectedLanguage?.toLowerCase() === solution.language.toLowerCase() ? "solid" : "outline"}
            mr={2}
            mb={2}
            onClick={() => setSelectedLanguage(solution.language)}
          >
            {solution.language}
          </Button>
        ))}
      </Flex>

      {selectedSolution ? (
        <VStack align="start" spacing={4} w="100%">
          <Box w="100%" p={4} bg="#2d2d2d" borderRadius="md" overflow="auto">
            <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", color: "#c3c3c3" }}>
              {selectedSolution.content}
            </pre>
          </Box>
        </VStack>
      ) : (
        <Text>No solution available for the selected language.</Text>
      )}
    </Box>
  );
};

export default Solutions;
