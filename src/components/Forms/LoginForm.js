import React, { useState } from "react";
import { Input, InputGroup, Stack, InputLeftElement, FormControl, Button, Heading, Box, Alert, AlertIcon, InputRightElement, FormHelperText } from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { isRequired, ValidateEmail } from '../../utils/validation';
import { authenticationService } from "../../services/authenticationService";

function LoginForm({ handleLoginSuccess}) {

    const [hasError, setHasError] = useState(false);
    const [show, setShow] = useState(false);

    const [validation, setValidation] = useState({
        validation: [false, false],
        errorMessage: ['', '']
    });

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const handleLoginFail=()=>{
        setHasError(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            authenticationService.login(data)
                .then((result) => {
                    if (result.success) {
                        handleLoginSuccess();
                    } else {
                        handleLoginFail();
                    }
                });

        } catch (error) {

        }

    }

    const handleChange = (event) => {
        var value = event.target.value;
        var name = event.target.name;

        if (name === 'email') {
            ValidateEmail(value, validation, setValidation, 0, 'email');
        }
        else if (name === 'password') {
            isRequired(value, validation, setValidation, 1, 'password');
        }


        setData({ ...data, [event.target.name]: value })
    };


    return (

        <Box border="1px" borderColor="gray.200" p={['5px', '15px', '25px']}>
            <Heading as="h4" size="md" textAlign='center' pb='20px' pt='5px'>
                Log In
            </Heading>
            {hasError ? <Alert status="error" mb='20px' >
                <AlertIcon />
                Error while Login!!
            </Alert> : null}
            <form action='submit'>
                <Stack spacing={3}>

                    <FormControl isRequired>
                        <InputGroup>
                            <InputLeftElement children={<EmailIcon />} />
                            <Input
                                data-testid = "email"
                                type='email'
                                value={data.email}
                                placeholder='Email'
                                aria-label='Email'
                                name='email'
                                onChange={(event) => handleChange(event)}
                                isInvalid={validation.validation[0]}
                                errorBorderColor={validation.validation[0] ? "green.300":"crimson"} />

                        </InputGroup>
                        <FormHelperText color={validation.validation[0] ? "green.300":"crimson"}>{validation.errorMessage[0]}</FormHelperText>

                    </FormControl>


                    <FormControl isRequired>
                        <InputGroup>
                            <InputLeftElement children={<LockIcon />} />
                            <Input
                                data-testid = "password"
                                type={show ? "text" : "password"}
                                value={data.password}
                                placeholder='Password'
                                aria-label='Password'
                                name='password'
                                onChange={(event) => handleChange(event)}
                                isInvalid={validation.validation[1]}
                                errorBorderColor={validation.validation[1] ? "green.300":"crimson"}
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>

                        </InputGroup>
                        <FormHelperText color={validation.validation[0] ? "green.300":"crimson"}>{validation.errorMessage[1]}</FormHelperText>

                    </FormControl>


                    <Button data-testid = "login" colorScheme='teal' type="button" onClick={handleSubmit}>Log In</Button>

                </Stack>
            </form>
        </Box>

    );
}

export default LoginForm;