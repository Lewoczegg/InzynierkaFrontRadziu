import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
import MenuBar from './components/MenuBar';
import Assignments from './components/Assignments';
import Lessons from './components/Lessons';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import LessonDetails from './components/LessonDetails';
import AssignmentEditor from './components/AssignmentEditor';
import AuthPage from './components/AuthPage';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Box
      minH="100vh"
      bg="#0f0a19"
      color="gray.500"
      display="flex"
      flexDirection="column"
      pt="60px"
    >
      <MenuBar />
      <Box>
        <Routes>
          <Route path="/" element={
            <Box>
              <Text fontSize="3xl" color="white">Welcome to Code-Series!</Text>
              <Text fontSize="md" color="gray.400">Explore our courses, lessons, and assignments.</Text>
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
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
