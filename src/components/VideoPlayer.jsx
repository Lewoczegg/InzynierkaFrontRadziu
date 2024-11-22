import React, { useEffect, useState } from "react";
import { Box, Text, Center, Spinner } from "@chakra-ui/react";
import { fetchVideo } from "../api"; // Import funkcji API

const VideoPlayer = ({ fileName }) => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVideo = async () => {
      try {
        setLoading(true);
        const videoBlob = await fetchVideo(fileName); // Pobierz dane wideo na podstawie `fileName`
        const videoUrl = URL.createObjectURL(videoBlob); // Stwórz URL dla wideo
        setVideoSrc(videoUrl); // Ustaw źródło wideo
      } catch (error) {
        setError("Nie udało się pobrać wideo. Spróbuj ponownie później.");
      } finally {
        setLoading(false);
      }
    };

    if (fileName) {
      getVideo();
    }

    return () => {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc); // Zwolnij pamięć
      }
    };
  }, [fileName]);

  return (
    <Box
      p={6}
      bg="#1e1e2e"
      borderRadius="lg"
      boxShadow="xl"
      textAlign="center"
      color="white"
    >
      {loading ? (
        <Center>
          <Spinner size="xl" color="teal.300" />
          <Text mt={4} fontSize="lg" color="gray.300">
            Ładowanie wideo...
          </Text>
        </Center>
      ) : error ? (
        <Text fontSize="xl" color="red.500" fontWeight="bold">
          {error}
        </Text>
      ) : (
        <video
          controls
          preload="metadata"
          width="100%"
          height="auto"
          style={{ borderRadius: "md", boxShadow: "lg" }}
        >
          <source src={videoSrc} type="video/mp4" />
          Twoja przeglądarka nie wspiera odtwarzania wideo.
        </video>
      )}
    </Box>
  );
};

export default VideoPlayer;
