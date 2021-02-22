import React, { useState } from "react";
import {
    Input, Stack, FormControl, Button, Divider, Box, Center, FormHelperText, useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    VStack,
    Text
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { ValidateEmail, isRequired } from '../../utils/Validation2';
import { authHeader } from "../../services/_helpers/authheader";
import { CheckCircleIcon, QuestionIcon } from '@chakra-ui/icons';


const BASE_URL = ''
function AddAssistantForm({onSuccess}) {
    const [addedAssistant, setAddedAssistant] = useState(null)
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
    });

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [validation, setValidation] = useState({
        validation: [false, false, false],
        errorMessage: ['', '', '']
    });

    const validateBeforeSubmit = () => {
        isRequired(data.firstname, validation, setValidation, 0, 'first name');
        isRequired(data.lastname, validation, setValidation, 1, 'last name');
        ValidateEmail(data.email, validation, setValidation, 2, 'email');

        if (!validation.validation[0] && !validation.validation[1] && !validation.validation[2]) {
            return true;
        }
        return false;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        var isValid = validateBeforeSubmit();
        if (isValid) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var { Authorization, token } = authHeader();
            myHeaders.append(Authorization, token);
            var dataToSend = {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,

            }
            try {
                var raw = JSON.stringify(dataToSend);

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(`${BASE_URL}/employees`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            setAddedAssistant({ email: result.email, password: result.password });
                            showResult();
                            // onSuccess({ email: result.email, password: result.password });
                        }
                    })
                    .catch(error => console.log('error', error));
            } catch (e) {
                console.error(e);
            } finally {
                console.log('We do cleanup here');
            }

        }
    };

    const showResult = (result) => {
        onOpen();
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

    return (

        <Box border="1px" borderColor="gray.200" p={['5px', '15px', '25px']} w='500px'>

            <form action='submit'>
                <Stack spacing={3}>


                    <FormControl isRequired>
                        <Input
                            type='text'
                            value={data.firstname}
                            name='firstname'
                            placeholder='First Name'
                            aria-label='Fisrt Name'
                            onChange={(event) => handleChange(event)}
                            isInvalid={validation.validation[0]}
                            errorBorderColor="crimson"
                        />
                        <FormHelperText color='crimson'>{validation.errorMessage[0]}</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <Input
                            type='text'
                            value={data.lastname}
                            name='lastname'
                            placeholder='Last Name'
                            aria-label='Last Name'
                            onChange={(event) => handleChange(event)}
                            isInvalid={validation.validation[1]}
                            errorBorderColor="crimson"
                        />
                        <FormHelperText color='crimson'>{validation.errorMessage[1]}</FormHelperText>
                    </FormControl>
                    <Divider />
                    <FormControl isRequired>
                        <Input
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



                    <Button colorScheme='cyan' type="submit" onClick={(event) => handleSubmit(event)}>Add the Assistant</Button>

                </Stack>
            </form>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            {addedAssistant ?
                                <VStack mb='10px'>
                                    <CheckCircleIcon w={10} h={10} color="green.500" />
                                    <Text>Added Sucessfully</Text>
                                    <Text>{addedAssistant.email}</Text>
                                    <Text>{addedAssistant.password}</Text>
                                    <Button><Link to="/assistants" >Return</Link></Button>
                                </VStack>
                                :
                                <VStack>
                                    <QuestionIcon w={10} h={10} color="red.500" />
                                    <Text>Unsuccessful</Text>
                                </VStack>
                            }
                        </Center>

                    </ModalBody>


                </ModalContent>
            </Modal>
        </Box>

    );
}

export default AddAssistantForm;