import React from "react";
import { Box, Image, Badge, Grid, GridItem, Center, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Lorem, ModalFooter, useDisclosure, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import VisitingPlacePreview from './VisitingPlacePreview';

function VisitingPlaceCard(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box width='auto' borderWidth="1px" borderRadius="lg" overflow="hidden" p='10px' mb='10px'>
            <Grid h="auto"
                templateColumns="repeat(8, 1fr)"
                templateRows="repeat(3, 1fr)"
                gap={4}>

                <GridItem colSpan={{ base: 8, md: 2 }} rowSpan={{ base: 1, md: 3 }} pt='12px'>
                    <Center>
                        <Image src={props.imageUrl} alt='place name' />
                    </Center>

                </GridItem>

                <GridItem colSpan={{ base: 8, md: 5 }} rowSpan={{ base: 1, md: 3 }}>
                    <Box p="6">
                        <Box d="flex" alignItems="baseline">
                            <Badge borderRadius="full" px="2" colorScheme="teal">
                                New
                        </Badge>

                        </Box>

                        <Box data-testId ="travel_place"
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                        >
                            <Text fontSize='3xl'>{props.placeName}</Text>
                        </Box>

                        <Box data-testId ="travel_distance">
                            {props.distance} km from the hotel
                            <Box as="span" color="gray.600" fontSize="sm">
                            </Box>
                        </Box>
                        <Box data-testId = "reachTime">
                            {props.timeToReach} min journey
                            <Box as="span" color="gray.600" fontSize="sm">
                            </Box>
                        </Box>

                        <Box d="flex" mt="2" alignItems="center" data-testId = "travel_method">
                            <Text fontSize='sm'>Travel by :</Text>
                            {props.methods.map((method, i) => (
                                <Badge m='3px' borderRadius="full" px="2" colorScheme="orange">
                                    {method}
                                </Badge>
                            ))
                            }
                        </Box>
                    </Box>

                </GridItem>
                <GridItem colSpan={{ base: 8, md: 1 }} rowSpan={{ base: 1, md: 3 }} pt='50px'>
                    <Button rightIcon={<ArrowForwardIcon />} colorScheme="teal" variant="outline" onClick={onOpen}>Details</Button>

                    <Modal isOpen={isOpen} onClose={onClose} size="4xl" >
                        <ModalOverlay />

                        <ModalContent >
                            <ModalCloseButton />
                            <VisitingPlacePreview data={props} close={onClose} />
                        </ModalContent>
                    </Modal>

                </GridItem>


            </Grid>

        </Box>

    )
}

VisitingPlaceCard.defaultProps = {
    role: 'user'
}
export default VisitingPlaceCard;