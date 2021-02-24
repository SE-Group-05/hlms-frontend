import React from "react";
import { Box, Text, useColorMode} from "@chakra-ui/react";


function ProgressCard(props) {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box width='auto' borderWidth="1px" borderRadius="lg" overflow="hidden" p='5px' mb='10px' boxShadow="xl"
            bg={colorMode === 'light' ? `${props.colour}.400` : `${props.colour}.900`}>
 
            
            <Text data-testid="current_value" color='white' fontSize="6xl" ml='10px'>
                {props.currentvalue}
            </Text>

            <Text data-testid="heading" color='white' fontSize="2xl" ml='10px'>
                {props.Heading}
            </Text>

        </Box>
    )

}

export default ProgressCard;