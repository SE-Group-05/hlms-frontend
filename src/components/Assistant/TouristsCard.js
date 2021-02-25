import React from "react";
import { Box, Image, Badge, Grid, GridItem, Center, Button, useDisclosure, Modal, ModalOverlay, ModalContent, LoginForm, Wrap,WrapItem, HStack } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { MdDirectionsRun } from "react-icons/md";
import EditTourist from "./EditTourist.js";


function TouristCard(props) {
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

                <GridItem colSpan={{ base: 8, md: 3 }} rowSpan={{ base: 1, md: 3 }}>
                    <Box p="6">
                        <Box d="flex" alignItems="baseline">
                            <Badge borderRadius="full" px="2" colorScheme="teal">
                                New
                        </Badge>

                        </Box>                        
                        <Box
                                data-testid="full_name"
                                mt="1"
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                                isTruncated
                                
                                
                            >
                            {props.first_name+" "+props.last_name}
                            </Box>
                            

                        <Box data-testid="email">
                            {props.email}
                         
                        </Box>
                        <Box data-testid="phone">
                            {props.phone}
                            
                         
                        </Box>

                    
                        
                    </Box>

                </GridItem>

                <GridItem colSpan={{ base: 8, md: 3}} rowSpan={{ base: 1, md: 3 }} pt='50px'>
                    <Wrap spacing="30px">
                        <WrapItem>
                            <Button leftIcon={<MdDirectionsRun />} colorScheme="teal" >Activities</Button> 
                        </WrapItem>
                        <WrapItem>    
                            <Button leftIcon={<EditIcon />} colorScheme="teal" variant="outline" onClick={onOpen}>Update Details</Button>
                        </WrapItem>    
                        <WrapItem>
                            <Button leftIcon={<DeleteIcon />} colorScheme="red" onClick={()=>props.onDelete(props.id)}>Delete</Button>
                        </WrapItem>
                    </Wrap>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent top='100px'>
                            <EditTourist
                                imageUrl={props.imageUrl}
                                imageAlt={props.imageAlt}
                                id={props.id}
                                first_name={props.first_name}
                                last_name={props.last_name}
                                email={props.email}
                                phone={props.phone}                                
                                
                            />
                        </ModalContent>
                    </Modal>
                

                
                    
                 </GridItem>
                


            </Grid>
        </Box>
    )

}

export default TouristCard;