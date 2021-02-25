import React, { useState } from "react";
import {
    Input, Stack, FormControl, Button, Divider, Box, Alert, AlertIcon, Center, Avatar, Text, Badge, InputGroup, InputRightElement,
    FormHelperText
} from "@chakra-ui/react";

import { ValidateEmail, isRequired } from '../../utils/Validation2';

const BASE_URL = '';


function AssistantPreview(props) {
    const [data, setData] = useState(props.data);
    const [hasError, setHasError] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const [validation, setValidation] = useState({
        validation: [false, false, false],
        errorMessage: ['', '', '']
    });
    const respond = () => {
        data.fetch();
        props.close();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        var isValid = validateBeforeSubmit();
        if (isValid) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            event.preventDefault();
            console.log(data);
            var dataToSend = {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
            }
            try {
                var raw = JSON.stringify(dataToSend);

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(`${BASE_URL}/employees/${data.id}`, requestOptions)
                    .then(response => response.text())
                    .then(result => respond())
                    .catch(error => console.log('error', error));
            } catch (e) {
                console.error(e);
            } finally {
                console.log('We do cleanup here');
            }
        }

    };
    const validateBeforeSubmit = () => {
        isRequired(data.firstname, validation, setValidation, 0, 'first name');
        isRequired(data.lastname, validation, setValidation, 1, 'last name');
        ValidateEmail(data.email, validation, setValidation, 2, 'email');

        if (!validation.validation[0] && !validation.validation[1] && !validation.validation[2]) {
            return true;
        }
        return false;
    }
    const handleChange = (event) => {
        var value = event.target.value;
        var name = event.target.name;

        if (name === 'firstname') {
            isRequired(value, validation, setValidation, 0, 'first name');
        } else if (name === 'lastname') {
            isRequired(value, validation, setValidation, 1, 'last name');
        } else if (name === 'email') {
            ValidateEmail(value, validation, setValidation, 2, 'email');
        }

        setData({ ...data, [event.target.name]: value })
    };
    const ImgUpload = ({
        onChange,
        src
    }) =>
        <label htmlFor="photo-upload" className="custom-file-upload fas">
            <div className="img-wrap img-upload" >
                <img for="photo-upload" src='./profile.jpg' alt='Profile' />
            </div>
            <input id="photo-upload" type="file" onChange={onChange} />
        </label>

    return (

        <Box border="1px" borderColor="gray.200" p={['5px', '15px', '25px']} >

            {hasError ? <Alert status="error" mb='20px' >
                <AlertIcon />
                Error
            </Alert> : null}
            <form action='submit'>
                <Stack spacing={3}>
                    <Center>
                        {editMode ?
                            <Box w='200px' h='200px' mb='20px'>
                                <ImgUpload />
                            </Box>
                            :
                            <Avatar size="2xl" name="Profile photo" src="./user.png" />
                        }

                    </Center>

                    {editMode ?
                        <>
                            <Text fontSize="md">
                                <Badge variant="subtle" colorScheme="green">
                                    First name
                            </Badge>
                            </Text>
                            <FormControl isRequired>
                                <Input
                                    data-testid = "firstname_input"
                                    type='text'
                                    value={data.firstname}
                                    name='firstname'
                                    placeholder='First Name'
                                    aria-label='Fisrt Name'
                                    isInvalid={validation.validation[0]}
                                    onChange={(event) => handleChange(event)}
                                    errorBorderColor="crimson"
                                />
                            </FormControl>
                            <FormHelperText color='crimson'>{validation.errorMessage[0]}</FormHelperText>
                        </>
                        :
                        <>
                            <Text fontSize="md">
                                <Badge variant="subtle" colorScheme="green">
                                    First name
                            </Badge>
                            </Text>
                            <Text data-testid = "firstname" fontSize="2xl">{data.firstname}</Text>
                        </>
                    }
                    <Divider />
                    {editMode ?
                        <>
                            <Text fontSize="md">
                                <Badge variant="subtle" colorScheme="green">
                                    Last name
                            </Badge>
                            </Text>
                            <FormControl isRequired>
                                <Input
                                    data-testid = "lastname_input" 
                                    type='text'
                                    value={data.lastname}
                                    name='lastname'
                                    placeholder='Last Name'
                                    aria-label='Last Name'
                                    onChange={(event) => handleChange(event)}
                                    isInvalid={validation.validation[1]}
                                    errorBorderColor="crimson"
                                />
                            </FormControl>
                            <FormHelperText color='crimson'>{validation.errorMessage[1]}</FormHelperText>
                        </>
                        :
                        <>
                            <Text fontSize="md">
                                <Badge variant="subtle" colorScheme="green">
                                    Last name
                            </Badge>
                            </Text>
                            <Text data-testid = "lastname" fontSize="2xl">{data.lastname}</Text>
                        </>
                    }
                    <Divider />
                    {editMode ?
                        <>
                            <Text fontSize="md">
                                <Badge variant="subtle" colorScheme="green">
                                    email
                            </Badge>
                            </Text>
                            <FormControl isRequired>
                                <Input
                                    data-testid = "email_input"
                                    type='email'
                                    value={data.email}
                                    name='email'
                                    placeholder='Email'
                                    aria-label='Email'
                                    onChange={(event) => handleChange(event)}
                                    isInvalid={validation.validation[2]}
                                    errorBorderColor="crimson"
                                />
                                <FormHelperText color='crimson'>{validation.errorMessage[2]}</FormHelperText>
                            </FormControl>
                        </>
                        :
                        <>
                            <Text fontSize="md">
                                <Badge variant="subtle" colorScheme="green">
                                    Email
                            </Badge>
                            </Text>
                            <Text data-testid = "email" fontSize="2xl">{data.email}</Text>
                        </>
                    }


                    {editMode ?
                        <>
                            <Divider />
                            <Text fontSize="md">
                                <Badge variant="subtle" colorScheme="green">
                                    Password
                            </Badge>
                            </Text>
                            <InputGroup size="md">
                                <Input
                                    pr="4.5rem"
                                    type={show ? "text" : "password"}
                                    placeholder="Enter password"
                                    value=''
                                />
                                <InputRightElement width="4.5rem">
                                    <Button data-testid = "show_button" h="1.75rem" size="sm" onClick={handleClick}>
                                        {show ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </>
                        :
                        null
                    }

                    {editMode ?
                        null
                        :
                        <Button data-testid = "edit_button" colorScheme='cyan' onClick={() => setEditMode(true)}>Edit details</Button>
                    }
                    {editMode ?
                        <Button data-testid = "submit_button" colorScheme='cyan' type="submit" onClick={(event) => handleSubmit(event)}>Update the Assistant</Button>
                        :
                        null
                    }


                </Stack>
            </form>
        </Box>

    );
}

export default AssistantPreview;