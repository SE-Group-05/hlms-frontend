import React from "react";
import { Box, Text, Badge, Avatar, Stack, SimpleGrid,Divider } from "@chakra-ui/react";


function ScheduleCard(props) {
    var path = [];
    for (var i = 0; i < props.path.length; i++) {
        path.push(
            <>
                <Badge variant="outline" colorScheme="cyan">
                    {props.path[i]}

                </Badge>

            </>
        );

    }

    var stateBadge = (state) => {
        var color = '';
        if (state === 'completed') {
            color = 'green';
        }
        else if (state === 'not-completed') {
            color = 'orange';
        }
        else if (state === 'cancelled') {
            color = 'red';
        }
        return (
            <Badge variant="subtle" h='20px' colorScheme={color}>
                {state}
            </Badge>
        );
    }


    return (
        <Box width='auto' borderWidth="1px" borderRadius="lg" overflow="hidden" p='10px' mb='10px'  boxShadow="xl">
            <Stack direction={{base:"column", md:'row'}} mb='10px'>
                <Badge variant="solid" colorScheme="purple" fontSize="20px">
                    {props.place}
                </Badge>
                {stateBadge(props.state)}

            </Stack>


            <SimpleGrid columns={2} spacing='1px'>
                <Box>
                    <Text fontSize="xs"> Schedule By,</Text>
                    <Text fontSize="xs"><Avatar
                        size="xs"
                        name='user'
                        src='./user.png'
                        mr='5px'
                    />{props.user}</Text>
                </Box>
                <Box>
                    <Text fontSize="xs">Fair</Text>
                    <Text fontSize="xl">{props.fair}</Text>

                </Box>
            </SimpleGrid>

            <Divider />


            <Text fontSize="lg" mt='10px'>Path</Text>
            <Stack direction={{base:"column", md:'row'}}>
                {path}
            </Stack>


            <SimpleGrid columns={2} spacing='1px'>
                <Box>
                    <Text fontSize="lg" mt='10px'>Travel Method</Text>
                    <Badge variant="outline" colorScheme="orange">
                        {props.travelmethod}

                    </Badge>
                </Box>
                <Box>
                    <Text fontSize="lg" mt='10px'>Date</Text>
                    <Badge variant="outline" colorScheme="blue">
                        {props.date}

                    </Badge>

                </Box>
            </SimpleGrid>








        </Box>
    )

}

export default ScheduleCard;