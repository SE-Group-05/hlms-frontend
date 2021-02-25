import React from "react";
import {
    Text, Stack, Heading, Box,  Badge,  Image, Button,HStack,Center
    
} from "@chakra-ui/react";
import PreviewMap from "./PreviewMap";
import AddToScheduleArea from "./AddToScheduleArea";


function VisitingPlacePreview(props) {
    const data=props.data;    
    return (

        <Box border="1px" borderColor="gray.200" p={['5px', '15px', '25px']}>                
            
                <Heading as="h4" size="lg" textAlign='center' pb='20px' pt='5px' >
                    {data.placeName}
                </Heading>
                <Box shadow="xl" mb='20px' >
                    <Image src={data.imageUrl} alt='photo' rounded="md" />
                </Box>
                

            <Stack spacing={3}>
                <Box shadow="xl" p='10px' rounded="md" mb='10px' data-testId="description">
                        <Text fontSize="3xl" >Description</Text>
                        <Text data-testid="description">{data.description}</Text>
                    </Box>
                
                    <Box>
                        <PreviewMap place_locations={[{latitude:data.latitude,longitude:data.longitude}]} place_names={[{name:data.placeName}]}/>
                    </Box>

                

                    <Box shadow="xl" p='10px' rounded="md" mb='10px' data-testId="distance">
                        <Text fontSize="2xl" >Distance

                        <Badge data-testid="distance" ml="1" fontSize="0.8em" colorScheme="green" variant='outline'>
                                {data.distance} km
                            </Badge>
                        </Text>

                    </Box>
                
                    <Box shadow="xl" p='10px' rounded="md" mb='10px' >
                        <Text fontSize="2xl">Travelling Method
                            
                        {data.methods.map((method, i) => (
                            <Badge m='3px' borderRadius="full" px="2" colorScheme="orange">
                                {method}
                            </Badge>
                        ))
                        }
                        </Text>

                    </Box>
                
                    <Box shadow="xl" p='10px' rounded="md" mb='10px' data-testId="timeToReach">
                        <Text fontSize="2xl">Time to Reach
                    <Badge data-testid="timetoreach" ml="1" fontSize="0.8em" colorScheme="red" variant='outline'>
                                {data.timeToReach} min
                            </Badge>
                        </Text>

                    </Box>
                    
                        <AddToScheduleArea data={data}/>

            </Stack>
        </Box>

    );
}

export default VisitingPlacePreview;