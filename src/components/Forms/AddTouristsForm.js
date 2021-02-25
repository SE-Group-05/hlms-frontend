import React, { useState, useEffect } from "react";
import {
    Input, Stack, FormControl, Box,
    Heading, InputGroup,
    InputLeftElement, Button, HStack, FormHelperText, useDisclosure, Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    VStack,
    Text
} from "@chakra-ui/react";
import { AiOutlineUser, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { CheckCircleIcon, QuestionIcon } from '@chakra-ui/icons'
import { ValidateEmail, isRequired, isNumeric } from '../../utils/validation';
import { authHeader } from "../../services/_helpers/authheader";

function AddTouristForm(props) {
    const [addedTourist, setAddedTourist] = useState(null)
    const BASE_URL = '';
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: ""


    });
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [validation, setValidation] = useState({
        validation: [true, true, true, true],
        errorMessage: ['', '', '', '']
    });
    const addTourist = async (data) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var { Authorization, token } = authHeader();
        myHeaders.append(Authorization, token);
        var dataToSend = {
            firstname: data.first_name,
            lastname: data.last_name,
            email: data.email,
            mobile: data.phone
        }
        try {
            var raw = JSON.stringify(dataToSend);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${BASE_URL}/tourists`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setAddedTourist({ email: result.email, password: result.password });
                    onOpen();
                })
                .catch(error => console.log('error', error));
        } catch (e) {
            console.error(e);
        } finally {
            console.log('We do cleanup here');
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        for (var i = 0; i < validation.validation.length; i++) {
            if ((validation.validation[i] === false) && (validation.errorMessage[i] !== "valid")) {
                return
            }
        }
        addTourist(data)
        setData({ ...data, first_name: "", last_name: "", phone: "", email: "", roomType: "", roomNumber: "" })
    }

    async function handleChange(e) {
        var value = e.target.value;
        var name = e.target.name;


        if (name === 'first_name') {
            isRequired(value, validation, setValidation, 0, 'first name');
        } else if (name === 'last_name') {
            isRequired(value, validation, setValidation, 1, 'last name');
        } else if (name === 'email') {
            ValidateEmail(value, validation, setValidation, 2, 'email');
        } else if (name === 'phone') {
            isNumeric(value, validation, setValidation, 3, "mobile number")
        }
        setData({ ...data, [e.target.name]: value })

    };
    return (

        <Box border="1px" borderColor="gray.200" p={['5px', '15px', '25px']}>
            <Heading as="h4" size="md" textAlign='center' pb='20px' pt='5px'>Add New Customer</Heading>
            <form action='submit' onSubmit={onSubmit}>
                <Stack spacing={4}>
                    <HStack spacing="10px">
                        <FormControl isRequired>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<AiOutlineUser color="" />} />
                                <Input
                                    data-testid = "first_name"
                                    name="first_name"
                                    value={data.first_name}
                                    placeholder="First Name"
                                    isInvalid={!validation.validation[0]}
                                    onChange={(e) => handleChange(e)}
                                    errorBorderColor="crimson"
                                />
                            </InputGroup>
                            <FormHelperText color='crimson'>{(validation.errorMessage[0] === "valid") ? "" : validation.errorMessage[0]}</FormHelperText>
                        </FormControl>

                        <FormControl isRequired>
                            <InputGroup>
                                <Input
                                data-testid = "last_name"
                                    name="last_name"
                                    value={data.last_name}
                                    placeholder="Last Name"
                                    isInvalid={!validation.validation[1]}
                                    onChange={(e) => handleChange(e)}
                                    errorBorderColor="crimson"
                                />
                            </InputGroup>
                            <FormHelperText color='crimson'>{(validation.errorMessage[1] === "valid") ? "" : validation.errorMessage[1]}</FormHelperText>
                        </FormControl>
                    </HStack>
                    <FormControl isRequired>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<AiOutlinePhone color="" />} />
                            <Input
                            data-testid = "phone"
                                name="phone"
                                value={data.phone}
                                isInvalid={!validation.validation[3]}
                                placeholder="Mobile Number"
                                onChange={(e) => handleChange(e)}
                                errorBorderColor="crimson"
                            />
                        </InputGroup>
                        <FormHelperText color='crimson'>{(validation.errorMessage[3] === "valid") ? "" : validation.errorMessage[3]}</FormHelperText>
                    </FormControl>

                    <FormControl isRequired>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<AiOutlineMail color="" />} />
                            <Input
                            data-testid = "email"
                                name="email"
                                value={data.email}
                                isInvalid={!validation.validation[2]}
                                placeholder="Email Address"
                                onChange={(e) => handleChange(e)}
                                errorBorderColor="crimson"
                            />
                        </InputGroup>
                        <FormHelperText color='crimson'>{(validation.errorMessage[2] === "valid") ? "" : validation.errorMessage[2]}</FormHelperText>
                    </FormControl>



                    <Button colorScheme='cyan' type="submit">Add Customer</Button>
                </Stack>

            </form>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            {addedTourist ?
                                <VStack mb='10px'>
                                    <CheckCircleIcon w={10} h={10} color="green.500" />
                                    <Text>Added Sucessfully</Text>
                                    <Text>{addedTourist.email}</Text>
                                    <Text>{addedTourist.password}</Text>
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

export default AddTouristForm;
