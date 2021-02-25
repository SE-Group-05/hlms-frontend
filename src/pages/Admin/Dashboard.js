import React, { useEffect, useState } from "react";
import { Box, Center, Heading, SimpleGrid, Divider } from "@chakra-ui/react";
import ProgressCard from "../../components/Admin/ProgressCard";
import ScheduleCard from "../../components/Admin/ScheduleCard";
import PreviewMap from "../../components/Admin/PreviewMap";
import { dashboardService } from "../../services/dashBoard";
import { scheduleService } from "../../services/scheduleService";

//number of users
//number of assistants
//number of visiting places
//Active users
//Restricted users
//All viviting places on the map
//

function AdminDashboard() {
  const [dashboard, setDashboard] = useState([]);
  const [hasError, setErrors] = useState(false);

  const [places, setPlaces] = useState([]);
  const [placenames, setPlacenames] = useState([]);

  const [schedules, setSchedules] = useState([]);

  const fetchData = async () => {
    dashboardService.getDashboard().then((result) => {
      if (result.success) {
        setDashboard(result.dashboardValues);
        setPlaces(result.dashboardValues.place_locations);
        setPlacenames(result.dashboardValues.place_names);
      } else {
        setErrors(result.status);
      }
    });

    scheduleService.getSchedules().then((result) => {
      if (result.success) {
        console.log(result.schedules);
        setSchedules(result.schedules);
      } else {
        setErrors(result.status);
      }
    });
  };

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
          <Heading data-testid = "placename" as="h4" size="md" ml="20px" mb="30px">
           {dashboard.users_count}{dashboard.users_count ? "works" : "not-works"}
          </Heading>
          <Divider />
          <SimpleGrid minChildWidth="120px" spacing="40px" mb="10px" mt="20px">
            <ProgressCard
              Heading="Assistants"
              maxvalue="100"
              currentvalue={dashboard.users_count}
              colour="red"
            />
            <ProgressCard
              Heading="Tourists Total"
              maxvalue="5000"
              currentvalue={dashboard.tourist_count_total}
              colour="orange"
            />
            <ProgressCard
              Heading="Tourists In"
              maxvalue="5000"
              currentvalue={dashboard.tourist_count_in}
              colour="green"
            />
            <ProgressCard
              Heading="Visiting Places"
              maxvalue="100"
              currentvalue={dashboard.place_count}
              colour="yellow"
            />
            <ProgressCard
              Heading="Schedules"
              maxvalue="100"
              currentvalue={dashboard.schedules_count_total}
              colour="blue"
            />
          </SimpleGrid>
          <Divider />
          <Heading as="h2" size="lg" ml="20px" mb="20px" mt="30px">
            Schedules
          </Heading>
          <Box>
            <SimpleGrid
              minChildWidth="200px"
              maxWidth='500px'
              spacing="20px"
              mb="10px"
              mt="20px"
            >
              <ScheduleCard
                place="Mirissa"
                user="Kamal perera"
                date="2021/01/20"
                travelmethod="bus"
                fair="Rs. 200.00"
                state="completed"
                path={["Mirissa", "Galle fort", "Jungle beach"]}
              />
             {schedules.map((schedule, i) => (
                <ScheduleCard place={schedule.place} user={schedule.user} date={schedule.data} travelmethod={schedule.travelMethod} fair={schedule.fair} state={schedule.state} path={['Mirissa', 'Galle fort', 'Jungle beach']} />
              ))}
            </SimpleGrid>
          </Box>
          <Divider />
          <Heading as="h2" size="lg" ml="20px" mb="20px" mt="30px">
            Visiting Places
          </Heading>
          <Box>
            <PreviewMap
              place_locations={places}
              place_names={dashboard.place_names}
            />
          </Box>
        </Box>
      </Center>
    </>
  );
}

export default AdminDashboard;
