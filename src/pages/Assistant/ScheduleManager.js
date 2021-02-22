import React from "react";
import { Box, Center, Heading, Wrap, WrapItem,Divider } from "@chakra-ui/react";
import ScheduleCard from "../../components/Assistant/ScheduleCard";
import SearchBar from "../../components/Assistant/SearchBar";

function ScheduleManager() {
    return (
        <>
            <Center w="100%" h="auto" p={4} pb='100px'>
                <Box w="90%" h="auto" borderWidth="1px" borderRadius="lg" p='30px'>
                    <Heading ml='20px' mb='20px'>Schedule Manager</Heading>
                    <Center >
                    <SearchBar text='Search Schedules...' />
                    </Center>
                    <Divider/>
                    <Heading as="h2" size="lg" ml='20px' mb='20px' mt='30px'>Schedules</Heading>
                    <Box>
                        <Wrap spacing="30px">
                            <WrapItem>
                                <ScheduleCard place='Mirissa' user='Kamal perera' date='2021/01/20' travelmethod='bus' fair='Rs. 200.00' state='completed' path={['Mirissa', 'Galle fort', 'Jungle beach']} />
                            </WrapItem>
                             <WrapItem>
                                <ScheduleCard place='Mirissa' user='Kamal perera' date='2021/01/20' travelmethod='bus' fair='Rs. 200.00' state='completed' path={['Mirissa', 'Galle fort', 'Jungle beach']} />
                            </WrapItem>
                             <WrapItem>
                                <ScheduleCard place='Mirissa' user='Kamal perera' date='2021/01/20' travelmethod='bus' fair='Rs. 200.00' state='completed' path={['Mirissa', 'Galle fort', 'Jungle beach']} />
                            </WrapItem>
                             <WrapItem>
                                <ScheduleCard place='Mirissa' user='Kamal perera' date='2021/01/20' travelmethod='bus' fair='Rs. 200.00' state='completed' path={['Mirissa', 'Galle fort', 'Jungle beach']} />
                            </WrapItem>
                             <WrapItem>
                                <ScheduleCard place='Mirissa' user='Kamal perera' date='2021/01/20' travelmethod='bus' fair='Rs. 200.00' state='completed' path={['Mirissa', 'Galle fort', 'Jungle beach']} />
                            </WrapItem>
                             <WrapItem>
                                <ScheduleCard place='Mirissa' user='Kamal perera' date='2021/01/20' travelmethod='bus' fair='Rs. 200.00' state='completed' path={['Mirissa', 'Galle fort', 'Jungle beach']} />
                            </WrapItem>
                        </Wrap>
                    </Box>
                </Box>
                
            </Center>
                    
            
        </>
    )
    
}

export default ScheduleManager;