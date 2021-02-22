import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import AddScheduleForm from "../Forms/AddScheduleForm";

const AddToScheduleArea = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button colorScheme="teal" onClick={onOpen}>Add To Schedule</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <AddScheduleForm data={props.data}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddToScheduleArea;
