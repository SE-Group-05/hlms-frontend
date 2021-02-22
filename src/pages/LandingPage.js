import { Box, Center, Text, Heading, Button, SlideFade, VStack, } from "@chakra-ui/react";
import React, { memo } from 'react';
import { Link as ReachLink } from "@reach/router"
import { Link } from "react-router-dom";
import './Landing.css';
function LandingPage({
	title,
	subtitle1,
	subtitle2,
	...rest }) {
	return (
		<>

			<div className='landing'>

				<Center pt='35vh'>
					<VStack w={{ base: "80%", md: "40%" }}>
						<SlideFade offsetY='-100px' in={true}>
							<Text fontSize={{ base: '4xl', sm: '6xl' }} color='white'>
								{title}
							</Text>
						</SlideFade>

						<SlideFade offsetY='-10px' in={true}>
							<Text fontSize={{ base: 'md', sm: 'xl' }} color='teal.300' mb='20px'>
								{subtitle1}                        </Text>
						</SlideFade>


						<Heading
							as="h2"
							size="md"
							color="primary.800"
							opacity="0.8"
							fontWeight="normal"
							lineHeight={1.5}
							textAlign={["center", "center", "left", "left"]}
						>
							<SlideFade offsetY='-10px' in={true}>
								<Text color='teal.100' mb='20px' fontSize='sm'>
									{subtitle2}
								</Text>
							</SlideFade>
						</Heading>

						<SlideFade offsetY='100px' in={true}>
							<Link to='/login' as={ReachLink}>
								<Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
									Login
          						</Button>
							</Link>
						</SlideFade>

					</VStack>
				</Center>

				<Box color='teal' position='fixed' bottom='0px' w='100%'>
					<Center><Text color='teal.100' fontSize={{ base: 'xs', sm: 'md' }}>Designed by University of Moratuwa | 2020 All Rights Reserved</Text></Center>
				</Box>

			</div>
		</>
	)
}
LandingPage.defaultProps = {
	title: "Welcome",
	subtitle1: "Sunrise - Hotel Management System",
	subtitle2: "Plan ahead with guaranteed flexibility",
};
export default memo(LandingPage);
