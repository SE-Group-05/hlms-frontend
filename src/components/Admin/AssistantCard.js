import React from "react";
import { Box, Image, Badge, Grid, GridItem, Center, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons"
import AssistantPreview from "./AssistentPreview";

function AssistantCard(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box width='auto' borderWidth="1px" borderRadius="lg" overflow="hidden" p='10px' mb='10px'>
            <Grid h="auto"
                templateColumns="repeat(8, 1fr)"
                templateRows="repeat(3, 1fr)"
                gap={4}>

                <GridItem colSpan={{ base: 8, md: 2 }} rowSpan={{ base: 1, md: 3 }} pt='12px'>
                    <Center>
                        <Image src={props.imageUrl} alt={props.imageAlt} borderRadius="full" boxSize="120px" />
                    </Center>

                </GridItem>

                <GridItem colSpan={{ base: 8, md: 5 }} rowSpan={{ base: 1, md: 3 }}>
                    <Box p="6">
                        <Box d="flex" alignItems="baseline">
                            <Badge borderRadius="full" px="2" colorScheme="teal">
                                New
                        </Badge>

                        </Box>

                        <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                            data-testid="display_name"
                        >
                            {props.firstname} {props.lastname}
                        </Box>

                        <Box data-testid="email">
                            {props.email}
                            <Box as="span" color="gray.600" fontSize="sm">
                               
                        </Box>
                        </Box>

                    </Box>

                </GridItem>
                <GridItem colSpan={{ base: 8, md: 1 }} rowSpan={{ base: 1, md: 3 }} pt='50px'>
                    <Button rightIcon={<ArrowForwardIcon />} colorScheme="teal" variant="outline" onClick={onOpen}>Details</Button>

                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />

                        <ModalContent top='100px'>
                            <ModalCloseButton />
                            <AssistantPreview data={props} close={onClose} />
                        </ModalContent>
                    </Modal>
                </GridItem>


            </Grid>
        </Box>
    )

}

export default AssistantCard;