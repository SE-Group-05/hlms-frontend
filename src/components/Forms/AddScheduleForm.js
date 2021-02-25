import React, { useState } from "react";
import {
    Input, Text, Radio, RadioGroup, Stack, FormControl, FormHelperText, Button, Heading, Box, Alert, AlertIcon, useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    VStack,
    Center
} from "@chakra-ui/react";
import { CheckCircleIcon, QuestionIcon } from '@chakra-ui/icons';
import { isRequired } from '../../utils/Validation2';
import { getUserId } from "../../utils/";
import { authHeader } from "../../services/_helpers/authheader";

const BASE_URL = ''
function AddScheduleForm(props) {
    const [data, setData] = useState({
        user: getUserId(),
        place: props.data.id,
        date: null,
        time: null,
        travellingMethod: null

    });
    const [validation, setValidation] = useState({
        validation: [true, false, false],
        errorMessage: ['', '', '']
    });
    const handleChange = (event) => {
        var value = event.target.value;
        var name = event.target.name;

        if (name === 'date') {
            isRequired(value, validation, setValidation, 1, 'date');
        } else if (name === 'time') {
            isRequired(value, validation, setValidation, 2, 'time');
        }

        setData({ ...data, [event.target.name]: value })
    };
    const handleRadioClick = (value) => {
        setData({ ...data, travellingMethod: value })
    }
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [submitResult, setSubmitResult] = useState(null);
    const handleSubmit = async (event) => {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var { Authorization, token } = authHeader();
        myHeaders.append(Authorization, token);
        var dataToSend = {
            user: data.user,
            place: data.place,
            date: `${data.date}T${data.time}:00.000Z`,
            travellingMethod: data.travellingMethod
        }
        try {
            var raw = JSON.stringify(dataToSend);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${BASE_URL}/schedules`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        onOpen();
                        setSubmitResult(true);
                    }
                })
                .catch(error => setSubmitResult(false));
        } catch (e) {
            setSubmitResult(false);
        }
    };
    return (

        <Box border="1px" borderColor="gray.200" p={['5px', '15px', '25px']} >
            <Heading as="h4" size="md" textAlign='center' pb='20px' pt='5px'>
                Schedule Routings
            </Heading>
            <form action='submit' onSubmit={handleSubmit}>
                <Stack spacing={4}>

                    <Text >Date</Text>
                    <FormControl isRequired>
                        <Input
                            data-testid = 'date'
                            type='date'
                            value={data.date}
                            name='date'
                            placeholder='Date'
                            aria-label='Date'
                            isInvalid={validation.validation[1]}
                            onChange={(event) => handleChange(event)}
                            errorBorderColor="crimson"
                        />
                        <FormHelperText color='crimson'>{validation.errorMessage[1]}</FormHelperText>
                    </FormControl>

                    <Text >Time</Text>
                    <FormControl isRequired>
                        <Input
                        data-testid = 'time'
                            type='time'
                            value={data.time}
                            name='time'
                            placeholder='Time'
                            aria-label='Time'
                            isInvalid={validation.validation[2]}
                            onChange={(event) => handleChange(event)}
                            errorBorderColor="crimson"
                        />
                        <FormHelperText color='crimson'>{validation.errorMessage[2]}</FormHelperText>
                    </FormControl>
                    <RadioGroup onChange={handleRadioClick} value={data.travellingMethod}>
                        <Stack direction="row">
                            {props.data.methods.map(method => <Radio value={method}>{method}</Radio>)}
                        </Stack>
                    </RadioGroup>
                    <Button colorScheme='cyan' type="submit" >Save</Button>

                </Stack>
            </form>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            {submitResult ?
                                <VStack mb='10px'>
                                    <CheckCircleIcon w={10} h={10} color="green.500" />
                                    <Text>Added Sucessfully</Text>
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
export default AddScheduleForm;