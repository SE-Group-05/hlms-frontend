import React, { useState } from "react";
import {
  Input, Text, Stack, FormControl, Button, Divider, Heading, Box, Alert, AlertIcon, Textarea, InputGroup, FormHelperText, RadioGroup, Radio,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
  VStack
} from "@chakra-ui/react";

import { Link } from 'react-router-dom';
import Map from "../Admin/Map";
import { isNumeric, isRequired, isRequiredArr } from '../../utils/Validation2';
import { visitingPlaceService } from "../../services/visitingplaceService";
import { authHeader } from "../../services/_helpers/authheader";
import { CheckCircleIcon, QuestionIcon } from '@chakra-ui/icons'
const BASE_URL = 'http://localhost:5000'


function VisitingPlaceForm() {
  const [data, setData] = useState({
    placeName: '',
    description: '',
    latitude: '',
    longitude: '',
    method: '',
  });

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [distance, setDistance] = useState(0)
  const [timetoreach, setTimetoreach] = useState(0)

  const [tmethods, setTmethods] = useState([]);

  const [hasError, setHasError] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [validation, setValidation] = useState({
    validation: [false, false, false, false, false, false, false],
    errorMessage: ['', '', '', '', '', '', '']
  });

  const showResult = (result) => {
    onOpen();
  }

  const validateBeforeSubmit = () => {
    console.log(tmethods);
    isRequired(data.placeName, validation, setValidation, 0, 'place name');
    isRequired(data.description, validation, setValidation, 1, 'description');
    isNumeric(data.latitude, validation, setValidation, 2, 'latitude');
    isNumeric(data.longitude, validation, setValidation, 3, 'longitude');
    isRequired(distance, validation, setValidation, 4, 'distance');
    isRequiredArr(tmethods, validation, setValidation, 5, 'method');
    isRequired(timetoreach, validation, setValidation, 6, 'time to reach');

    if (!validation.validation[0] && !validation.validation[1] && !validation.validation[2] && !validation.validation[3] && !validation.validation[4]
      && !validation.validation[5]) {
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
        name: data.placeName,
        description: data.description,
        location: {
          coordinates: [data.longitude, data.latitude]
        },
        distance: distance,
        methods: tmethods,
        timeToReach: timetoreach,
        images: []
      }
      try {
        var raw = JSON.stringify(dataToSend);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(`${BASE_URL}/places`, requestOptions)
          .then(response => response.json())
          .then(result => showResult(result))
          .catch(error => console.log('error', error));
      } catch (e) {
        console.error(e);
      } finally {
        console.log('We do cleanup here');
      }

    }
  };
  // const handleSubmit = (event) => {
  //     event.preventDefault();
  //     var dataToSend = {
  //         name: data.placeName,
  //         description: data.description,
  //         location: {
  //             coordinates: [data.latitude, data.longitude]
  //         },
  //         distance: distance,
  //         methods: tmethods,
  //         timeToReach: timetoreach,
  //         images: []
  //     }
  //     submitData(dataToSend);
  // };
  const submitData = async (data) => {
    visitingPlaceService.addVisitingPlace(data)
      .then((result) => {
        if (result.success) {
          console.log(result.visitingPlace);
        } else {
          // setErrors(result.status);
        }
      });
  }


  const handleChange = (event) => {
    var value = event.target.value;
    var name = event.target.name;

    if (name === 'placeName') {
      isRequired(value, validation, setValidation, 0, 'place name');
    }
    else if (name === 'description') {
      isRequired(value, validation, setValidation, 1, 'description');
    }
    else if (name === 'latitude') {
      isNumeric(value, validation, setValidation, 2, 'latitude')
    }
    else if (name === 'longitude') {
      isNumeric(value, validation, setValidation, 3, 'longitude')
    }
    else if (name === 'distance') {
      isRequired(value, validation, setValidation, 4, 'distance');
    }
    else if (name === 'timeToReach') {
      isRequired(value, validation, setValidation, 5, 'time to reach');
    }

    setData({ ...data, [event.target.name]: value });
  };

  const handleCheckBoxChange = (value) => {
    if (tmethods.includes(value)) {
      const index = tmethods.indexOf(value);
      if (index > -1) {
        tmethods.splice(index, 1);
      }
      var methods = tmethods;
      setTmethods(methods);
    } else {
      var methods = tmethods.concat(value);
      setTmethods(methods);
    }
  }

  const handleClickonMap = (longitude, latitude) => {
    isNumeric(data.latitude, validation, setValidation, 2, 'latitude');
    isNumeric(data.longitude, validation, setValidation, 3, 'longitude');
    setData({ ...data, latitude: latitude, longitude: longitude });
    console.log(latitude, longitude);
  }
  return (

    <Box my="4" border="1px" borderColor="gray.200" p={['5px', '15px', '25px']}>
      <Heading as="h4" size="md" textAlign='center' pb='20px' pt='5px'>
        Add a Visiting Place
            </Heading>
      {hasError ? <Alert status="error" mb='20px' >
        <AlertIcon />
                Error
            </Alert> : null}
      <form action='submit'>
        <Stack spacing={3}>
          <Text >Name of the place</Text>
          <FormControl isRequired>
            <Input
              data-testid = "placename"
              type='text'
              value={data.placeName}
              name='placeName'
              placeholder='Name of the place'
              aria-label='Name'
              onChange={(event) => handleChange(event)}
              isInvalid={validation.validation[0]}
              errorBorderColor="crimson"
            />
            <FormHelperText color='crimson'>{validation.errorMessage[0]}</FormHelperText>
          </FormControl>
          <Text >Description</Text>
          <FormControl isRequired>
            <Textarea
            data-testid = "description"
              type='text'
              name='description'
              value={data.description}
              placeholder='Description'
              aria-label='Description'
              onChange={(event) => handleChange(event)}
              isInvalid={validation.validation[1]}
              errorBorderColor="crimson"
            />
            <FormHelperText color='crimson'>{validation.errorMessage[1]}</FormHelperText>
          </FormControl>
          <Divider />




          <Text >Location</Text>
          <FormControl isRequired>
            <InputGroup>
              <Input
              data-testid = "latitude"
                type='text'
                name='latitude'
                value={data.latitude}
                placeholder='Latitude'
                aria-label='Latitude'
                onChange={(event) => handleChange(event)}
                isInvalid={validation.validation[2]}
                errorBorderColor="crimson"
              />
              <Input
              data-testid = "longitude"
                type='text'
                name='longitude'
                value={data.longitude}
                placeholder='Longitude'
                aria-label='Longitude'
                onChange={(event) => handleChange(event)}
                isInvalid={validation.validation[3]}
                errorBorderColor="crimson"
              />
            </InputGroup>
            <FormHelperText color='crimson'>{validation.errorMessage[2]} {validation.errorMessage[3]}</FormHelperText>
          </FormControl>
          <Map onClickonMap={handleClickonMap} />



          <Text >Distance (Km)</Text>
          <FormControl isRequired>
            <NumberInput step={0.100} defaultValue={0} min={0.100} max={30} precision={3}
              isInvalid={validation.validation[4]}
              onChange={(valueString) => setDistance(valueString)}
              value={distance}
              errorBorderColor="crimson" >
              <NumberInputField
                placeholder='Distance'
                name='distance'
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormHelperText color='crimson'>{validation.errorMessage[4]}</FormHelperText>
          </FormControl>

          <Text >Available Travelling Methods</Text>
          <FormControl isRequired>
            <Stack direction="row">
              <Checkbox
                onChange={(e) => handleCheckBoxChange('Bus')}
              >
                Bus
                            </Checkbox>
              <Checkbox
                onChange={(e) => handleCheckBoxChange('Train')}
              >
                Train
                                </Checkbox>
              <Checkbox
                onChange={(e) => handleCheckBoxChange('Car')}
              >
                Car
                                </Checkbox>
              <Checkbox
                onChange={(e) => handleCheckBoxChange('Threewheeler')}
              >
                Threewheeler
                                </Checkbox>
              <Checkbox
                onChange={(e) => handleCheckBoxChange('Foot')}
              >
                Foot
                                </Checkbox>

            </Stack>
            <FormHelperText color='crimson'>{validation.errorMessage[5]}</FormHelperText>
          </FormControl>

          <Text >Time to reach (min)</Text>
          <FormControl isRequired>
            <NumberInput step={1} defaultValue={0} min={1} max={180}
              isInvalid={validation.validation[6]}
              errorBorderColor="crimson"
              onChange={(valueString) => setTimetoreach(valueString)}
              value={timetoreach} >
              <NumberInputField
                placeholder='Time To Reach'
                name='timeToReach'
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormHelperText color='crimson'>{validation.errorMessage[6]}</FormHelperText>
          </FormControl>
          <Text >Add Images</Text>

          <Button colorScheme='cyan' type="submit" onClick={(event) => handleSubmit(event)}>Add the place</Button>

        </Stack>
      </form>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              {!confirm ?
                <VStack mb='10px'>
                  <CheckCircleIcon w={10} h={10} color="green.500" />
                  <Text>Added Sucessfully</Text>
                  <Button><Link to="/visitingplaces" >Return</Link></Button>
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

export default VisitingPlaceForm;