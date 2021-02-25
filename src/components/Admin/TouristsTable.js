import React from "react";
import { Box, Thead, Tr, Th, Tbody, Td, Table, Avatar, Button, Badge } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons"

function TouristsTable(props) {

    const reviews = (rating, reviewCount) => {
        return (
            <Box d="flex" mt="2" alignItems="center">
                {Array(5)
                    .fill("")
                    .map((_, i) => (
                        <StarIcon
                            key={i}
                            color={i < rating ? "teal.500" : "gray.300"}
                        />
                    ))}
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                    {reviewCount} reviews
                        </Box>
            </Box>
        );
    }

    const DP = (name, url)=>{
        return(
            <Avatar
            size="xs"
            name={name}
            src={url}
            ml='10%'
        />
        );
    }

    return (
        <Box width='auto' borderWidth="1px" borderRadius="lg" overflow="hidden" p='5px' mb='10px'>
            <Table size="sm">
                <Thead>
                    <Tr>
                        <Th>Profile photo</Th>
                        <Th>Name</Th>
                        <Th>Reviews</Th>
                        <Th>State</Th>
                        <Th>Restrict the user</Th>
                    </Tr>
                </Thead>
                <Tbody>
                {props.tourists.map((tourist,i)=>{
                    return(<Tr>
                        <Td>{DP('user', "./user.png")}</Td>
                        <Td data-testid = "name">{tourist.firstname} {tourist.lastname} </Td>
                        <Td>{reviews(2,50)}</Td>
                        <Td><Badge colorScheme="green">Active</Badge></Td>
                        <Td><Button size="xs" colorScheme="teal" variant="ghost">Restrict</Button></Td>
                    </Tr>);
                    
                })}
                    
                    
                </Tbody>
            </Table>
        </Box>
    )

}

export default TouristsTable;