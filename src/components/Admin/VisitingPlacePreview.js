import React, { useState } from "react";
import {
  Input,
  Text,
  Stack,
  FormControl,
  Button,
  Divider,
  Heading,
  Box,
  Alert,
  AlertIcon,
  Textarea,
  InputGroup,
  Badge,
  useColorMode,
  Image,
  FormHelperText,
  RadioGroup,
  Radio,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Center,
  Checkbox,
} from "@chakra-ui/react";
import { visitingPlaceService } from "../../services/visitingplaceService";
import Map from "./Map";
import { isNumeric, isRequired, isRequiredArr } from "../../utils/Validation2";

const BASE_URL = "";

function VisitingPlacePreview(props) {
  const [data, setData] = useState(props.data);
  const [hasError, setHasError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState("1");
  const { colorMode, toggleColorMode } = useColorMode();

  const [distance, setDistance] = useState(data.distance);
  const [timetoreach, setTimetoreach] = useState(data.timeToReach);
  const [tmethods, setTmethods] = useState([]);

  const [validation, setValidation] = useState({
    validation: [false, false, false, false, false, false],
    errorMessage: ["", "", "", "", "", ""],
  });

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
  };

  const respond = () => {
    data.fetch();
    props.close();
  };
  const validateBeforeSubmit = () => {
    isRequired(data.placeName, validation, setValidation, 0, "place name");
    isRequired(data.description, validation, setValidation, 1, "description");
    isNumeric(data.latitude, validation, setValidation, 2, "latitude");
    isNumeric(data.longitude, validation, setValidation, 3, "longitude");
    isRequired(distance, validation, setValidation, 4, "distance");
    isRequiredArr(tmethods, validation, setValidation, 5, "method");
    isRequired(timetoreach, validation, setValidation, 6, "time to reach");

    if (
      !validation.validation[0] &&
      !validation.validation[1] &&
      !validation.validation[2] &&
      !validation.validation[3] &&
      !validation.validation[4] &&
      !validation.validation[5]
    ) {
      return true;
    }
    return false;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    var isValid = validateBeforeSubmit();

    if (isValid) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      console.log(data);
      console.log(value);
      var dataToSend = {
        name: data.placeName,
        description: data.description,
        location: {
          coordinates: [data.longitude, data.latitude],
        },
        distance: distance,
        method: tmethods,
        timeToReach: timetoreach,
        images: [],
      };
      try {
        var raw = JSON.stringify(dataToSend);

        var requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${BASE_URL}/places/${data.id}`, requestOptions)
          .then((response) => response.text())
          .then((result) => respond())
          .catch((error) => console.log("error", error));
      } catch (e) {
        console.error(e);
      } finally {
        console.log("We do cleanup here");
      }
    }
  };
  const handleChange = (event) => {
    var value = event.target.value;
    var name = event.target.name;

    if (name === "placeName") {
      isRequired(value, validation, setValidation, 0, "place name");
    } else if (name === "description") {
      isRequired(value, validation, setValidation, 1, "description");
    } else if (name === "latitude") {
      isNumeric(value, validation, setValidation, 2, "latitude");
    } else if (name === "longitude") {
      isNumeric(value, validation, setValidation, 3, "longitude");
    } else if (name === "distance") {
      isRequired(value, validation, setValidation, 4, "distance");
    } else if (name === "timeToReach") {
      isRequired(value, validation, setValidation, 5, "time to reach");
    }

    setData({ ...data, [event.target.name]: value });
  };
  const handleClickonMap = (longitude, latitude) => {
    setData({ ...data, latitude: latitude, longitude: longitude });
    console.log(latitude, longitude);
  };
  return (
    <Box border="1px" borderColor="gray.200" p={["5px", "15px", "25px"]}>
      {hasError ? (
        <Alert status="error" mb="20px">
          <AlertIcon />
          Error
        </Alert>
      ) : null}
      <form action="submit">
        {editMode ? (
          <>
            <Heading  as="h4" size="lg" textAlign="center" pb="20px" pt="5px">
              Edit the place
            </Heading>
            <Text>Name of the place</Text>
            <FormControl isRequired mb="10px">
              <Input
                type="text"
                data-testid="placename_input"
                value={data.placeName}
                name="placeName"
                placeholder="Name of the place"
                aria-label="Name"
                onChange={(event) => handleChange(event)}
                isInvalid={validation.validation[0]}
                errorBorderColor="crimson"
              />
              <FormHelperText color="crimson">
                {validation.errorMessage[0]}
              </FormHelperText>
            </FormControl>
          </>
        ) : (
          <>
            <Heading
              data-testid="placename"
              as="h4"
              size="lg"
              textAlign="center"
              pb="20px"
              pt="5px"
            >
              {data.placeName}
            </Heading>
            <Box shadow="xl" mb="20px">
              <Image src={data.imageUrl} alt="photo" rounded="md" />
            </Box>
          </>
        )}

        <Stack spacing={3}>
          {editMode ? (
            <>
              <Text>Description</Text>
              <FormControl isRequired>
                <Textarea
                data-testid="description_input"
                  type="text"
                  name="description"
                  value={data.description}
                  placeholder="Description"
                  aria-label="Description"
                  onChange={(event) => handleChange(event)}
                  isInvalid={validation.validation[1]}
                  errorBorderColor="crimson"
                />
                <FormHelperText color="crimson">
                  {validation.errorMessage[1]}
                </FormHelperText>
              </FormControl>
            </>
          ) : (
            <Box
              shadow="xl"
              p="10px"
              rounded="md"
              mb="10px"
              bg={colorMode === "light" ? "teal.50" : "teal.700"}
            >
              <Text fontSize="3xl">Description</Text>
              <Text data-testid="description">{data.description}</Text>
            </Box>
          )}
          {editMode ? (
            <>
              <Text>Location</Text>
              <FormControl isRequired>
                <InputGroup>
                  <Input
                  data-testid="latitude_input"
                    type="text"
                    name="latitude"
                    value={data.latitude}
                    placeholder="Latitude"
                    aria-label="Latitude"
                    onChange={(event) => handleChange(event)}
                    isInvalid={validation.validation[2]}
                    errorBorderColor="crimson"
                  />
                  <Input
                  data-testid="longitude_input"
                    type="text"
                    name="longitude"
                    value={data.longitude}
                    placeholder="Longitude"
                    aria-label="Longitude"
                    onChange={(event) => handleChange(event)}
                    isInvalid={validation.validation[3]}
                    errorBorderColor="crimson"
                  />
                </InputGroup>
                <FormHelperText color="crimson">
                  {validation.errorMessage[2]} {validation.errorMessage[3]}
                </FormHelperText>
              </FormControl>

              <Map onClickonMap={handleClickonMap} />
            </>
          ) : (
            <Box
              shadow="xl"
              p="10px"
              rounded="md"
              mb="10px"
              bg={colorMode === "light" ? "teal.50" : "teal.700"}
            >
              <Map onClickonMap={handleClickonMap} />
            </Box>
          )}

          {editMode ? (
            <>
              <Text>Distance (Km)</Text>
              <FormControl isRequired>
                <NumberInput
                data-testid="distance_input"
                  step={0.1}
                  defaultValue={0}
                  min={0.1}
                  max={30}
                  precision={3}
                  isInvalid={validation.validation[4]}
                  onChange={(valueString) => setDistance(valueString)}
                  value={distance}
                  errorBorderColor="crimson"
                >
                  <NumberInputField placeholder="Distance" name="distance" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              
              <FormHelperText color="crimson">
                {validation.errorMessage[4]}
              </FormHelperText>
              </FormControl>
            </>
          ) : (
            <Box
              shadow="xl"
              p="10px"
              rounded="md"
              mb="10px"
              bg={colorMode === "light" ? "teal.50" : "teal.700"}
            >
              <Text fontSize="2xl">
                Distance
                <Badge
                  data-testid="distance"
                  ml="1"
                  fontSize="0.8em"
                  colorScheme="green"
                  variant="outline"
                >
                  {distance} km
                </Badge>
              </Text>
            </Box>
          )}
          {editMode ? (
            <>
              <FormControl isRequired>
                <Stack direction="row">
                  <Checkbox onChange={(e) => handleCheckBoxChange("Bus")}>
                    Bus
                  </Checkbox>
                  <Checkbox onChange={(e) => handleCheckBoxChange("Train")}>
                    Train
                  </Checkbox>
                  <Checkbox onChange={(e) => handleCheckBoxChange("Car")}>
                    Car
                  </Checkbox>
                  <Checkbox
                    onChange={(e) => handleCheckBoxChange("Threewheeler")}
                  >
                    Threewheeler
                  </Checkbox>
                  <Checkbox onChange={(e) => handleCheckBoxChange("Foot")}>
                    Foot
                  </Checkbox>
                </Stack>
                <FormHelperText color="crimson">
                  {validation.errorMessage[5]}
                </FormHelperText>
              </FormControl>
            </>
          ) : (
            <Box
              shadow="xl"
              p="10px"
              rounded="md"
              mb="10px"
              bg={colorMode === "light" ? "teal.50" : "teal.700"}
            >
              <Text fontSize="2xl">
                Travelling Method
                {data.methods.map((method, i) => (
                  <Badge
                    m="3px"
                    borderRadius="full"
                    px="2"
                    colorScheme="orange"
                  >
                    {method}
                  </Badge>
                ))}
              </Text>
            </Box>
          )}
          {editMode ? (
            <>
              <Text>Time to reach (min)</Text>
              <FormControl isRequired>
                <NumberInput
                data-testid="timetoreach_input"
                  step={1}
                  defaultValue={0}
                  min={1}
                  max={180}
                  isInvalid={validation.validation[6]}
                  errorBorderColor="crimson"
                  value={timetoreach}
                  onChange={(valueString) => setTimetoreach(valueString)}
                >
                  <NumberInputField
                    placeholder="Time To Reach"
                    name="timeToReach"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                  <FormHelperText color="crimson">
                    {validation.errorMessage[6]}
                  </FormHelperText>
                </NumberInput>
              </FormControl>
            </>
          ) : (
            <Box
              shadow="xl"
              p="10px"
              rounded="md"
              mb="10px"
              bg={colorMode === "light" ? "teal.50" : "teal.700"}
            >
              <Text fontSize="2xl">
                Time to Reach
                <Badge
                  data-testid="timetoreach"
                  ml="1"
                  fontSize="0.8em"
                  colorScheme="red"
                  variant="outline"
                >
                  {timetoreach} min
                </Badge>
              </Text>
            </Box>
          )}
          {editMode ? (
            <Button
              colorScheme="cyan"
              type="submit"
              onClick={(event) => handleSubmit(event)}
            >
              Update the place
            </Button>
          ) : null}

          {editMode ? null : (
            <Center>
              <HStack>
                <Button colorScheme="teal" onClick={() => setEditMode(true)}>
                  Edit the place
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() =>
                    visitingPlaceService.deleteAVisitingPlace(data._id)
                  }
                >
                  Delete the place
                </Button>
              </HStack>
            </Center>
          )}
        </Stack>
      </form>
    </Box>
  );
}

export default VisitingPlacePreview;
