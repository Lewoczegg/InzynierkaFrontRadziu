import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Center,
  VStack,
  Button,
  Input,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { fetchAssignmentById, fetchLatestSubmission, uploadVideo, fetchVideo } from "../api";
import Solutions from "./Solutions";
import VideoPlayer from "./VideoPlayer";

const Assignment = ({ assignmentId }) => {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latestSubmission, setLatestSubmission] = useState(null);
  const [submissionLoading, setSubmissionLoading] = useState(true);
  const [submissionError, setSubmissionError] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const toast = useToast();
  const [videoExists, setVideoExists] = useState(false);
  const fileInputRef = useRef(null);
  const [isBlurVisible, setIsBlurVisible] = useState(true);

  useEffect(() => {
    const getAssignment = async () => {
      try {
        setLoading(true);
        const assignmentData = await fetchAssignmentById(assignmentId);
        setAssignment(assignmentData);
      } catch (err) {
        setError("Failed to fetch assignment. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getAssignment();
  }, [assignmentId]);

  useEffect(() => {
    const getLatestSubmission = async () => {
      try {
        setSubmissionLoading(true);
        const submissionData = await fetchLatestSubmission(assignmentId);
        setLatestSubmission(submissionData);
      } catch (err) {
        setSubmissionError(true);
      } finally {
        setSubmissionLoading(false);
      }
    };

    getLatestSubmission();
  }, [assignmentId]);

  useEffect(() => {
    const checkVideoExists = async () => {
      try {
        const videoBlob = await fetchVideo(`${assignmentId}`);
        if (videoBlob) {
          setVideoExists(true);
        }
      } catch (error) {
        setVideoExists(false);
      }
    };
    checkVideoExists();
  }, [assignmentId]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      setUploadError(null);
      const response = await uploadVideo(selectedFile);
      toast({
        title: "Upload Successful",
        description: `File "${selectedFile.name}" has been uploaded successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setVideoExists(true);
    } catch (error) {
      console.error("Failed to upload file:", error);
      setUploadError("Failed to upload file. Please try again.");
      toast({
        title: "Upload Failed",
        description: "Failed to upload file. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleBlurClick = () => {
    setIsBlurVisible(false);
  };

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" color="teal.400" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="100vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Box
      w="100%"
      p={4}
      bgGradient="linear(to-b, #f5f7fa, #e9eff5)"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList>
          <Tab
            _selected={{
              color: "white",
              bgGradient: "linear(to-r, teal.400, teal.500, teal.600)",
            }}
          >
            Problem
          </Tab>
          <Tab
            _selected={{
              color: "white",
              bgGradient: "linear(to-r, teal.400, teal.500, teal.600)",
            }}
          >
            Solutions
          </Tab>
          <Tab
            _selected={{
              color: "white",
              bgGradient: "linear(to-r, teal.400, teal.500, teal.600)",
            }}
          >
            Grade
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              color="gray.700"
            >
              {assignment?.assignment ? (
                <>
                  <Text fontSize="2xl" mb={4} fontWeight="bold" color="teal.600">
                    {assignment.assignment.title}
                  </Text>
                  <Text fontSize="md" mb={4} color="gray.600">
                    {assignment.assignment.description.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </Text>
                </>
              ) : (
                <Text color="red.500">Assignment data not available</Text>
              )}
            </Box>
          </TabPanel>

          <TabPanel>
            <Box
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              position="relative"
              color="gray.700"
            >
              {isBlurVisible && (
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  bg="rgba(0, 0, 0, 0.5)"
                  backdropFilter="blur(5px)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  zIndex="10"
                  borderRadius="lg"
                  onClick={handleBlurClick}
                  cursor="pointer"
                >
                  <Text color="white" fontSize="lg">
                    Click to view the content
                  </Text>
                </Box>
              )}
              <Solutions assignmentId={assignmentId} />
            </Box>
          </TabPanel>

          <TabPanel>
            {submissionLoading ? (
              <Center height="100%">
                <Spinner size="md" color="teal.400" />
              </Center>
            ) : submissionError || !latestSubmission ? (
              <Box
                bg="white"
                borderRadius="lg"
                p={6}
                textAlign="center"
                boxShadow="md"
              >
                <Text fontSize="xl" color="yellow.500" fontWeight="bold">
                  Task not submitted yet
                </Text>
              </Box>
            ) : (
              <VStack align="start" spacing={6} w="100%">
                <Box
                  w="100%"
                  p={6}
                  bgGradient="linear(to-r, teal.400, teal.500)"
                  borderRadius="lg"
                  boxShadow="lg"
                  color="white"
                >
                  <Text fontSize="2xl" fontWeight="bold">
                    Grade: {latestSubmission.grade}
                  </Text>
                </Box>

                <Box
                  w="100%"
                  p={6}
                  bg="white"
                  borderRadius="lg"
                  boxShadow="md"
                  color="gray.700"
                >
                  <Text fontWeight="bold" mb={2} color="teal.600">
                    Solution Code:
                  </Text>
                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                    }}
                  >
                    {latestSubmission.content}
                  </pre>
                </Box>
              </VStack>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>

      {videoExists && (
        <Box mt={6}
          p={4}
        >
          <VideoPlayer fileName={`${assignmentId}`} />
        </Box>
      )}

      {assignment?.roles === "ROLE_ADMIN" && (
        <Box mt={6} p={6} bg="white" borderRadius="lg" boxShadow="lg">
          <Text fontSize="lg" mb={4} color="teal.600" fontWeight="bold">
            Upload Video
          </Text>

          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <Button
            bgGradient="linear(to-r, #2a7a69, #316fa8)"
            color="white"
            onClick={handleClick}
            mb={2}
            _hover={{
              bgGradient: "linear(to-r, teal.500, teal.600)",
              boxShadow: "xl",
            }}
            _active={{
              bgGradient: "linear(to-r, teal.600, teal.700)",
              transform: "scale(0.98)",
            }}
          >
            Choose File
          </Button>

          {selectedFile && (
            <Text mt={2} color="gray.300" fontSize="md">
              Selected File: <Text as="span" fontWeight="bold">{selectedFile.name}</Text>
            </Text>
          )}

          <Button
            colorScheme="teal"
            onClick={handleUpload}
            size="lg"
            width="full"
            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            _hover={{
              bgGradient: "linear(to-r, teal.500, teal.600, teal.700)",
              boxShadow: "xl",
            }}
            _active={{
              bgGradient: "linear(to-r, teal.600, teal.700, teal.800)",
              transform: "scale(0.98)",
            }}
            mt={4}
            color="white"
          >
            Upload Video
          </Button>

          {uploadError && (
            <Alert status="error" mt={4} borderRadius="md">
              <AlertIcon />
              {uploadError}
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Assignment;
