import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from "react-router-dom";
import {
	Flex,
	Box,
	Heading,
	Text,
	Button,
	Stack,
	HStack,
	StackDivider,
} from "@chakra-ui/react";
import { isLoggedIn } from '../../utils';

function TopNav(props) {
	let history = useHistory();

	function handleLogout() {
		localStorage.removeItem('token');
		history.push('/');
	}

	return (
		<Flex
			width="full"
			mb={4}
		>
			<Box width="full" boxShadow="lg">
				<Stack isInline justifyContent="space-between" px={8}>
					<LogoName />
					<Stack isInline justifyContent="space-between" mt={4} align="center">
						<HStack divider={<StackDivider borderColor="gray.200" />}>
							{props.routes.map(({ path, title }) => (
								<Text
									key={path}
									fontSize="20px"
									fontWeight="bold"
									fontFamily={"Agustina Regular"}
									mb={{ base: 8, sm: 0 }}
									mr={{ base: 0, sm: 8 }}
									display="block"
								>
									<Link key={path} className="w3-bar-item" to={`${props.prefix}${path}`}>
										{title}
									</Link>
								</Text>
							))}
							{isLoggedIn() && <Button onClick={handleLogout}>Logout</Button>}
						</HStack>
					</Stack>
				</Stack>
			</Box>
		</Flex>
	);
}

TopNav.propTypes = {
	routes: PropTypes.arrayOf(
		PropTypes.shape({
			path: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired
		})
	).isRequired,
	prefix: PropTypes.string,
	className: PropTypes.string
};

TopNav.defaultProps = {
	prefix: '',
	className: ''
};

const LogoName = () => {
	return (
		<Heading
			as="h1"
			size="xlg"
			letterSpacing={".1rem"}
			fontSize="50px"
			fontFamily={"Agustina Regular"}
		>
			SunRise
		</Heading>
	);
};



export default memo(TopNav);
