import React, { useEffect, useState } from 'react';
import { AddIcon } from "@chakra-ui/icons";
import { Box, Center, Heading, Button, useDisclosure, Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import AddTouristForm from "../../components/Forms/AddTouristsForm";
import TouristCard from "../../components/Assistant/TouristsCard";
import SearchBar from "../../components/Assistant/SearchBar";
import { touristService } from "../../services/touristService";

function TouristsManager() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState([]);
    const [hasError, setErrors] = useState(false);

    const fetchData = async () => {
        touristService.getTourists()
            .then((result) => {
                if (result.success) {
                    setData(result.tourists);
                } else {
                    setErrors(result.status);
                }
            });
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Button position="fixed" bottom="50px" right="50px" zIndex='1000' leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
                Add Tourists
        </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent top='100px'>
                    <AddTouristForm />
                </ModalContent>
            </Modal>
            <Center w="100%" h="auto" p={4} pt='180px' pb='100px'>
                <Box w="90%" h="auto" borderWidth="1px" borderRadius="lg" p='30px'>
                    <Heading ml='20px' mb='20px'>Tourist Manager</Heading>
                    <Center >
                        <SearchBar text='Search Tourists...' />
                    </Center>
                    {data.map((user) => (
                        <TouristCard
                            key={user.id}
                            id={user.id}
                            imageUrl="./user.png"
                            first_name={user.firstname}
                            last_name={user.lastname}
                            email={user.email}
                            phone={user.phone}

                        />
                    ))}

                </Box>
            </Center>
        </>
    )
}

export default TouristsManager;