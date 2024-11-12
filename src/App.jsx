import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Text, Flex } from '@chakra-ui/react';
import MenuBar from './components/MenuBar';
import Assignments from './components/Assignments';
import Lessons from './components/Lessons';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import LessonDetails from './components/LessonDetails';
import AssignmentEditor from './components/AssignmentEditor';
import AuthPage from './components/AuthPage';
import UserProfile from './components/UserProfile';
import DailyQuiz from './components/DailyQuiz';
import DailyQuizTile from './components/DailyQuizTile';
import DailyTaskTile from './components/DailyTaskTile';

function App() {
  return (
    <Box
      minH="100vh"
      bg="#0f0a19"
      color="gray.500"
      display="flex"
      flexDirection="column"
      pt="38px"
    >
      <MenuBar />
      <Box p={4}>
        <Routes>
          <Route path="/" element={
            <Box>
              <Text fontSize="3xl" color="white" mb={4} mt={2}>Welcome to Code-Series!</Text>
              <Text fontSize="md" color="gray.400" mb={6}>
                Explore our courses, lessons, assignments, daily quiz, and daily task.
              </Text>
              <Flex justifyContent="left" gap={6} wrap={{ base: 'wrap', md: 'nowrap' }}>
                <DailyQuizTile />
                <DailyTaskTile />
              </Flex>
            </Box>
          } />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/lessons/:lessonId" element={<LessonDetails />} />
          <Route path="/assignments/:assignmentId" element={<AssignmentEditor />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/daily-quiz" element={<DailyQuiz />} />
          <Route path="/daily-task" element={<div>Daily Task Page (to be implemented)</div>} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;


