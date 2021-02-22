import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  Center,
  Heading,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { Link as ReachLink } from "@reach/router"
import { Link } from "react-router-dom";
import { scheduleService } from "../../services/scheduleService";
import ScheduleCard from "../../components/Tourist/ScheduleCard";

function TouristDashboard() {
  const [mySchedules, setmySchedules] = useState([])
  const fetchData = async () => {
    scheduleService.getMySchedules()
      .then((result) => {
        if (result.success) {
          setmySchedules(result.schedules);
        }
      });
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Center w="100%" h="auto" p={4} pb="100px">
        <Box w="90%" h="auto" borderWidth="1px" borderRadius="lg" p="30px">
          <Heading as="h2" size="2xl" ml="20px" mb="20px">
            Dashboard
          </Heading>
          <Heading as="h4" size="md" ml="20px" mb="30px">
            Sunrise - Hotel Management System
          </Heading>
          <Divider />
          {mySchedules.length == 0 && <AlertBox />}
          {mySchedules.map((schedule, i) => (
            <ScheduleCard 
            key={schedule._id}
            place={schedule.place.name} 
            date={schedule.date} 
            travellingMethod={schedule.travellingMethod} 
            fair={schedule.fair} 
            state={schedule.state} />
          ))}
        </Box>
      </Center>
    </>
  );
}

export const AlertBox = () => {
  return (
    <Alert
      status="info"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      py="5"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Looks Like you don't have Any Schedules yet!
  </AlertTitle>
      <AlertDescription maxWidth="sm">
        <Text>Visit Visiting Places Page and Plan Your time</Text>
        <Link to='/app/visitingplaces' as={ReachLink}>
          <Button borderRadius="8px" m="5" py="4" px="4" lineHeight="1" size="md">
            Go to Visiting places
          </Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
}


export default TouristDashboard;
