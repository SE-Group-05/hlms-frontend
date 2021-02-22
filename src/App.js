import React, { Component } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Routes from './routes';

class App extends Component {
	render() {
		return (
			<ChakraProvider>
				<Routes />
			</ChakraProvider>
		);
	}
}

export default App;
