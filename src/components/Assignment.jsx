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
    <Box w="100%" p={2} borderRadius="md">
      <Tabs variant="soft-rounded" colorScheme="purple">
        <TabList ml="4">
          <Tab _selected={{ color: "white", bg: "teal.500" }}>Problem</Tab>
          <Tab _selected={{ color: "white", bg: "teal.500" }}>Solutions</Tab>
          <Tab _selected={{ color: "white", bg: "teal.500" }}>Grade</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box
              bg="#1b1133"
              p={6}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="md"
              color="gray.100"
              mb={6}
            >
              {assignment?.assignment ? (
                <>
                  <Text fontSize="2xl" mb={4} fontWeight="bold" color="white">
                    {assignment.assignment.title}
                  </Text>
                  <Text fontSize="md" mb={4}>
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
            <Solutions assignmentId={assignmentId} />
          </TabPanel>

          <TabPanel>
            {submissionLoading ? (
              <Center height="100%">
                <Spinner size="md" color="teal.400" />
              </Center>
            ) : submissionError || !latestSubmission ? (
              <Box
                bg="#1b1133"
                borderRadius="lg"
                w="100%"
                p={6}
                textAlign="center"
                boxShadow="md"
              >
                <Text fontSize="xl" color="yellow.500" fontWeight="bold">
                  Zadanie jeszcze nie zgłoszone
                </Text>
              </Box>
            ) : (
              <VStack align="start" spacing={6} w="100%">
                <Box
                  w="100%"
                  p={6}
                  bg="#48bb78"
                  borderWidth="1px"
                  borderRadius="md"
                  color="white"
                  boxShadow="md"
                >
                  <Text fontSize="2xl" fontWeight="bold">
                    Grade: {latestSubmission.grade}
                  </Text>
                </Box>

                <Box
                  w="100%"
                  p={6}
                  bg="#2c1e4b"
                  borderWidth="1px"
                  borderRadius="md"
                  boxShadow="md"
                  color="gray.100"
                >
                  <Text fontWeight="bold" mb={2}>
                    Solution Code:
                  </Text>
                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      color: "#c3c3c3",
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
        <Box mt={2} p={4} bg="#1b1133" borderRadius="lg" boxShadow="md">
          <Text fontSize="lg" mb={4} color="gray.100">
            Uploaded Video
          </Text>
          <VideoPlayer fileName={`${assignmentId}`} />
        </Box>
      )}

      {assignment?.roles === "ROLE_ADMIN" && (
        <Box mt={6} p={6} bg="#1b1133" borderRadius="lg" boxShadow="lg">
          <Text fontSize="lg" mb={4} color="gray.100" fontWeight="bold">
            Upload Video
          </Text>

          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <Button
            colorScheme="teal"
            variant="outline"
            onClick={handleClick}
            mb={2}
            _hover={{
              bg: "teal.600",
              color: "white",
            }}
            _active={{
              bg: "teal.700",
              transform: "scale(0.95)",
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
