import React, { useState } from 'react';
import {
  Input,
  Stack,
  FormControl,
  Box,
  Heading,
  Alert,
  AlertIcon,
  Button,
  FormHelperText,
  Text,
} from '@chakra-ui/react';
import { isRequired } from '../../utils/validation';
import { Checkbox } from 'theme-ui';

function AddPlacesForm() {
  const [value, setValue] = useState(null);
  const BASE_URL = '';
  const [hasError, setHasError] = useState(false);

  const [data, setData] = useState({
    methods:[],
    place: '',
    date: '',
    time: '',
    travelling_method: '',
    mark_completed: ''
  });

  const [validation, setValidation] = useState({
    validation: [true, true, true,true],
    errorMessage: ['', '', '',''],
  });
  const handleChange = event => {
    var value = event.target.value;
    var name = event.target.name;
    if (name === 'place') {
      isRequired(value, validation, setValidation, 0, 'place');
    } else if (name === 'date') {
      isRequired(value, validation, setValidation, 1, 'date');
    } else if (name === 'time') {
      isRequired(value, validation, setValidation, 1, 'time');
    } else if (name === 'travelling_method') {
      isRequired(value, validation, setValidation, 2, 'travelling_method');
    }

    setData({ ...data, [event.target.name]: value });
  };

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      console.log({ data, isDisabled, isFocused, isSelected });
      return {
        ...styles,
        backgroundColor: isFocused ? '#999999' : null,
        color: '#333333',
      };
    },
  };

  return (
    <Box
      border="1px"
      borderColor="gray.200"
      p={['5px', '15px', '25px']}
      width="500px"
    >
      <Heading as="h4" size="md" textAlign="center" pb="20px" pt="5px">
        Add Schedule
      </Heading>
      {hasError ? (
        <Alert status="error" mb="20px">
          <AlertIcon />
          Error
        </Alert>
      ) : null}
      <form action="submit">
        <Stack spacing={4}>
          <Text>Visiting Place</Text>
          <FormControl isRequired>
            <Input
              type="text"
              value={data.place}
              name="place"
              aria-label="Visiting place"
              isInvalid={validation.validation[0]}
              onChange={event => handleChange(event)}
              errorBorderColor="crimson"
            />
            <FormHelperText color="crimson">
              {validation.errorMessage[0]}
            </FormHelperText>
          </FormControl>
          <Text>Date</Text>
          <FormControl isRequired>
            <Input
              type="date"
              value={data.date}
              name="date"
              placeholder="Date"
              aria-label="Date"
              isInvalid={validation.validation[1]}
              onChange={event => handleChange(event)}
              errorBorderColor="crimson"
            />
            <FormHelperText color="crimson">
              {validation.errorMessage[1]}
            </FormHelperText>
          </FormControl>

          <Text>Time</Text>
          <FormControl isRequired>
            <Input
              type="time"
              value={data.time}
              name="time"
              placeholder="Time"
              aria-label="Time"
              isInvalid={validation.validation[2]}
              onChange={event => handleChange(event)}
              errorBorderColor="crimson"
            />
            <FormHelperText color="crimson">
              {validation.errorMessage[2]}
            </FormHelperText>
          </FormControl>

          <Text>Travelling method</Text>
          <FormControl isRequired>
            <Input
              type="text"
              value={data.travelling_method}
              name="travelling_method"
              placeholder="travelling_method"
              aria-label="travelling_method"
              isInvalid={validation.validation[3]}
              onChange={event => handleChange(event)}
              errorBorderColor="crimson"
            />
            <FormHelperText color="crimson">
              {validation.errorMessage[3]}
            </FormHelperText>
          </FormControl>

          <Text>Mark as completed</Text>
          <FormControl isRequired>
            <Checkbox
              value={data.mark_completed}
              name="mark_completed"
              onChange={event => handleChange(event)}
              errorBorderColor="crimson"
            />
          </FormControl>

          <Button
            colorScheme="cyan"
            type="submit"
            onClick={() => setHasError(!hasError)}
          >
            Save
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
export default AddPlacesForm;
