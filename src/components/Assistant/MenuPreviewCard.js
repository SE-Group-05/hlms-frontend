import React from "react";
import { Box, Heading, Text, Image, Badge, Grid, GridItem, ReactRouterLink, Button, Flex, Spacer, Modal, ModalOverlay, ModalContent, LoginForm, Collapse } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { Link as ReachLink } from "@reach/router"

function MenuPreviewCard(props) {
    const [show, setShow] = React.useState(false)

    const handleToggle = () => setShow(!show)


    return (
        
        <Link to={props.linkTo} as={ReachLink}>
            <Box
                data-testid="MenuPreviewCard"
                maxW="md"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                _hover={{
                    bgGradient: "linear(to-r, gray.50, teal.50)",
                }}>

                <Image
                    h="400px"
                    objectFit="cover"
                    src={props.imageUrl}
                    alt={props.imageAlt} />
                <Box p="8">
                    <Box >
                        <Box
                            color="gray.500"
                            fontWeight="bold"
                            letterSpacing="wide"
                            fontSize="xl"
                            textTransform="uppercase"
                            textAlign="center"
                            data-testid="title"
                        >
                            {props.title}
                        </Box>
                        <Collapse in={show}>
                            <Box
                                color="black"
                                fontWeight="semi-bold"
                                letterSpacing="wide"
                                fontSize="l"
                                textTransform="uppercase"
                                textAlign="center"
                            >
                                {props.description}
                            </Box>
                        </Collapse>
                        <Flex>
                            <Box></Box>
                            <Spacer />
                            <Box >
                                <Button size="sm" onClick={handleToggle} mt="1rem">
                                    Show {show ? "Less" : "More"}
                                </Button>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </Box>
            </Link>
            
    )
}
export default MenuPreviewCard;