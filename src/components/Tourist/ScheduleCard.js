import React from 'react';
import { Box, Badge, Text } from "@chakra-ui/react";

const ScheduleCard = ({ place, date, travellingMethod, fair, state }) => {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" my="5">

            <Box p="6">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                    {state}
                </Badge>


                <Box data-testid="place"
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                >
                    {place}
                </Box>

                <Box>
                    <Text>{`On : ${date.split('T')[0]}`}</Text>
                    <Text>{`At : ${date.split('T')[1]}`}</Text>
                    <Text>{`TravellingMethod : ${travellingMethod}`}</Text>
                    {fair && <Text>{`Fair : ${fair}`}</Text>}
                </Box>

            </Box>
        </Box>
    )
}

export default ScheduleCard;
