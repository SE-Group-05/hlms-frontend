import React, { useState } from 'react';
import {
  Input,
  Text,
  Stack,
  FormControl,
  Button,
  Heading,
  Box,
  Alert,
  AlertIcon,
  Checkbox,
} from '@chakra-ui/react';

import axios from 'axios';

const BASE_URL = '';
function ViewSchedule() {
  const [data, setData] = useState({
    methods: [],
    date: '',
    time: '',
    mark_completed: '',
  });
  //   const methods = [
  //     { value: 'Bus', label: 'Bus' },
  //     { value: 'Van', label: 'Van' },
  //     { value: 'Car', label: 'Car' },
  //   ];
  //const[data, setData]=useState([]);

  const [hasError, setHasError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [show, setShow] = React.useState(false);


  const handleSubmit = async event => {
    event.preventDefault();
    console.log(data);
    try {
      var res = await axios.post(`${BASE_URL}/places`, JSON.stringify(data));
      console.log(res.status);
      console.log(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      console.log('We do cleanup here');
    }
  };
  const handleChange = event => {
    var value = event.target.value;
    setData({ ...data, [event.target.name]: value });
  };

  return (
    <Box
      border="1px"
      borderColor="gray.200"
      p={['5px', '15px', '25px']}
      width="500px"
    >
      <Heading as="h4" size="md" textAlign="center" pb="20px" pt="5px">
        Current Schedule
      </Heading>
      {hasError ? (
        <Alert status="error" mb="20px">
          <AlertIcon />
          Error
        </Alert>
      ) : null}
      <form action="submit">
        <Stack spacing={3}>
          {editMode ? (
            <>
              <Text>Travelling destination</Text>
              <FormControl isRequired>
                <Input
                data-testid = "place"
                  type="text"
                  value={data.place}
                  name="place"
                  placeholder="Visiting Place"
                  aria-label="Place"
                  onChange={event => handleChange(event)}
                />
              </FormControl>
            </>
          ) : (
            <></>
          )}{' '}
          {editMode ? (
            <>
              <Text>Date</Text>
              <FormControl isRequired>
                <Input
                  data-testid = "date"
                  value={data.date}
                  name="date"
                  placeholder="Date"
                  aria-label="Date"
                  onChange={event => handleChange(event)}
                />
              </FormControl>
            </>
          ) : (
            <></>
          )}
          {editMode ? (
            <>
              <Text>Time</Text>
              <FormControl isRequired>
                <Input
                data-testid = "time"
                  type="time"
                  value={data.time}
                  name="time"
                  placeholder="Time"
                  aria-label="Time"
                  onChange={event => handleChange(event)}
                />
              </FormControl>
            </>
          ) : (
            <></>
          )}
          {editMode ? (
            <>
              <Text>Travelling Method</Text>

              <select>
                {/* value={useState.methods.value}
                onChange={this.handleChange} */}
              </select>
            </>
          ) : (
            <></>
          )}
          {editMode ? (
            <>
              <Text>Mark as completed</Text>
              <FormControl isRequired>
                <Checkbox
                  value={data.mark_completed}
                  name="mark_completed"
                  onChange={event => handleChange(event)}
                  errorBorderColor="crimson"
                />
              </FormControl>
            </>
          ) : (
            <></>
          )}
          {editMode ? null : (
            <Button colorScheme="teal" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          )}
          {editMode ? (
            <Button
              colorScheme="cyan"
              type="submit"
              onClick={event => handleSubmit(event)}
            >
              Update the schedule
            </Button>
          ) : null}
          <Button
            colorScheme="red"
            type="submit"
            onClick={event => handleSubmit(event)}
          >
            Delete
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default ViewSchedule;
