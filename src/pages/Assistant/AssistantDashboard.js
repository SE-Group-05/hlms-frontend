import React from "react";
import { Box, Center, Heading, Divider, Wrap, WrapItem } from "@chakra-ui/react";
import PreviewCard from "../../components/Assistant/MenuPreviewCard";


function AssistantDashboard() {

    return (
        <>
            <Center w="100%" h="100%" p={4} pb='100px'>
                <Box w="90%" h="auto" borderWidth="1px" borderRadius="lg" p='30px'>
                    <Heading as="h2" size="2xl" ml='20px' mb='20px'>Assitant Dashboard</Heading>
                    <Heading as="h4" size="md" ml='20px' mb='30px' >Sunrise - Hotel Assistant UI</Heading>
                    <Divider />
                    <Wrap spacing='50px' justify="center" mt='20px' mb='10px'>
                        <WrapItem>
                            <PreviewCard
                                imageUrl="https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/2017/04/21143242/tourists.jpg"
                                imageAlt="Tourist Couple Picture"
                                title="Tourist Manager "
                                linkTo="/app/tourists"
                                description=" Add Tousrists, Delete Tourists, Update Tourists Information and View Activites"
                            />
                        </WrapItem>
                        <WrapItem>

                            <PreviewCard
                                imageUrl="https://trendipia.com/wp-content/uploads/2017/05/phuket-thailand-beach-800x416.jpeg"
                                imageAlt="Location Picture"
                                title="View Visiting Place"
                                linkTo="/app/assistantvp"
                                description=" Search Visiting Places"
                            />


                        </WrapItem>
                        <WrapItem>

                            <PreviewCard
                                imageUrl="https://web-static.wrike.com/cdn-cgi/image/width=880,format=auto,q=80/blog/content/uploads/2020/01/Five-Features-of-a-Good-Monthly-Employee-Work-Schedule-Template.jpg?av=unknown"
                                imageAlt="Tourist Couple Picture"
                                title="Schedule Manager"
                                linkTo="/app/schedules"
                                description=" View Schedules"
                            />


                        </WrapItem>


                    </Wrap>


                </Box>
            </Center>

        </>
    );
}

export default AssistantDashboard;