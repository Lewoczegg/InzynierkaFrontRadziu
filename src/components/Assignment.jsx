import { Box, Button, Text, useToast, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";


const Assignment = () => {
  return (
    <Box w="100%" p={1} bg="#333" borderRadius="md">
      <Tabs variant='soft-rounded' colorScheme='white' >
        <TabList>

          <Tab color='#A3A3A3' _selected={{ color: 'white', bg: 'gray'}}>
            Problem
          </Tab>
          <Tab color='#A3A3A3' _selected={{ color: 'white', bg: 'gray' }}>
            Solutions
          </Tab>
          <Tab color='#A3A3A3' _selected={{ color: 'white', bg: 'gray' }}>
            Grade
          </Tab>
          <Tab color='#A3A3A3' _selected={{ color: 'white', bg: 'gray' }}>
            Feedback
          </Tab>

        </TabList>
        <TabPanels>
          <TabPanel>
            <Box p={4} borderWidth="1px" borderRadius="md">
              <Text fontSize="lg" mb={4} fontWeight="bold">145. Sort Colors</Text>
              <Text fontSize="md" mb={4}>
                Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same
                color are adjacent, with the colors in the order red, white, and blue.
              </Text>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box p={4} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold">
                Solutions
              </Text>
              <Text mb={2}>Solution 1: </Text>
              <Text mb={2}>Solution 2: </Text>
              <Text mb={2}>Solution 3: </Text>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box p={4} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold">
                Grade
              </Text>
              <Text mb={2}>Grade: 100%</Text>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box p={4} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold">
                Feedback
              </Text>
              <Text mb={2}>Great job!</Text>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>

    </Box>

  );
}
export default Assignment;