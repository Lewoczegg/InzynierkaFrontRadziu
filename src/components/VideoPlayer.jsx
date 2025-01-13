import React, { useEffect, useState } from "react";
import { Box, Text, Center, Spinner } from "@chakra-ui/react";
import { fetchVideo } from "../api";

const VideoPlayer = ({ fileName }) => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVideo = async () => {
      try {
        setLoading(true);
        const videoBlob = await fetchVideo(fileName);
        const videoUrl = URL.createObjectURL(videoBlob);
        setVideoSrc(videoUrl);
      } catch (error) {
        setError("Failed to download the video. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (fileName) {
      getVideo();
    }

    return () => {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [fileName]);

  return (
    <Box
      p={6}
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
      textAlign="center"
      color="gray.800"
    >
      <Text fontSize="2xl" mb={4} fontWeight="bold" color="teal.600" textAlign="left">
        Tutorial Video
      </Text>
      {loading ? (
        <Center flexDirection="column">
          <Spinner size="xl" color="teal.500" />
          <Text mt={4} fontSize="lg" color="gray.600">
            Loading video...
          </Text>
        </Center>
      ) : error ? (
        <Text fontSize="xl" color="red.600" fontWeight="bold">
          {error}
        </Text>
      ) : (
        <video
          controls
          preload="metadata"
          width="100%"
          height="auto"
          style={{
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </Box>

  );
};

export default VideoPlayer;
