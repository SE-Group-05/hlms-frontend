import React, { useState, useEffect } from "react";
import {
  Center,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from 'react-router-dom';
import Card from "../../components/Admin/AssistantCard";
import SearchBar from "../../components/Admin/SearchBar";
import AddAssistantForm from "../../components/Forms/AddAssistantForm";
import { assistantService } from "../../services/assistantService";

const Assistents = () => {
  const [assistants, setAssistants] = useState([]);
  const [hasError, setErrors] = useState(false);

  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    var value = event.target.value;
    setSearch(value);
  }

  const fetchData = async (quary) => {
    assistantService.getAssistants(quary)
      .then((result) => {
        if (result.success) {
          setAssistants(result.assistants);
        } else {
          setErrors(result.status);
        }
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const onAssistantAdded = () => {
    fetchData();
  }

  const searchData = async () => {
    assistantService.searchAssistants(search)
      .then((result) => {
        if (result.success) {
          setAssistants(result.assistants);
        } else {
          setErrors(result.status);
        }
      });
  }
  return (
    <>
      <AddAssistantArea onAssistantAdded={onAssistantAdded} />
      <Center w="100%" h="auto" p={4} pb='300px'>
        <Box w="90%" h="auto" borderWidth="1px" borderRadius="lg" p='10px'>
          <Heading ml='20px' mb='20px'>{assistants[0]} Assistants</Heading>
          <Center >
            <SearchBar text='Search Assistant...' value={search} onChange={(event) => handleChange(event)} onClick={() => searchData()} />
          </Center>
          {assistants.length === 0 ? <Box p='15px' bg='red.200' borderRadius='lg'><Text fontSize='sm' color="red.800">No assistants</Text></Box> : null}
          {assistants.map((assistant, i) => (
            <Card imageUrl="./user.png"
              imageAlt="User"
              id={assistant._id}
              firstname={assistant.firstname}
              lastname={assistant.lastname}
              email={assistant.email}
              fetch={fetchData} />
          ))}
        </Box>
      </Center>
    </>
  );
}


const AddAssistantArea = ({ onAssistantAdded }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onSuccess = () => {
    onClose();
    onAssistantAdded();
  }
  return (
    <>
      <Button
        p={6}
        colorScheme="teal"
        fontSize="20px"
        fontWeight="bold"
        onClick={onOpen}
        position="fixed"
        bottom="50px"
        right="50px"
        zIndex='1000'
        leftIcon={<AddIcon />} >
        Add Assistant
      </Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        motionPreset="slideInBottom"
        isCentered
        closeOnEsc
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <AddAssistantForm onSuccess={onSuccess} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const Added = ({ email, password }) => {
  <Alert
    status="success"
    variant="subtle"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    height="200px"
  >
    <AlertIcon boxSize="40px" mr={0} />
    <AlertTitle mt={4} mb={1} fontSize="lg">
      Assistant added!
  </AlertTitle>
    <AlertDescription maxWidth="sm">
      <Text>{`Assistant Email: ${email}`}</Text>
      <Text>{`Assistant Password: ${password}`}</Text>
    </AlertDescription>
  </Alert>
}
export default Assistents;