import React,{ useState ,useEffect} from "react";
import {Text,Avatar,HStack,
    Input, Stack, FormControl,
    FormLabel, Select, Box,
    Heading, InputGroup,
    Alert, AlertIcon,
    InputLeftElement,Button, Center,FormHelperText
} from "@chakra-ui/react";
import { AiOutlineUser, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { ValidateEmail, isRequired, isNumeric } from '../../utils/validation';
import { touristService } from '../../services/touristService';


function EditTourist(props) {
    const [hasError, setHasError] = React.useState(false);
    const [data, setData] = useState({
        first_name: props.first_name,
        last_name: props.last_name,
        phone:props.phone,
        email: props.email
        

    })

    //* Change form values
    function handleChange(e) {
        var value = e.target.value;
        var name = e.target.name;
        if(name==='first_name'){
            isRequired(value, validation, setValidation, 0, 'first name');
        }else if(name==='last_name'){
            isRequired(value, validation, setValidation, 1, 'last name');
        }else if(name==='email'){
            ValidateEmail(value, validation, setValidation, 2, 'email');
       } else if (name === 'phone') {
           isNumeric(value,validation,setValidation,3,"mobile number")
       }      
        setData({ ...data, [e.target.name]: value })        
        

    }
    //* Submit Change
    const [validation, setValidation] = useState({
        validation:[true,true,true,true],
        errorMessage:['','','','']
    });
    const onSubmit = (e) => {
        e.preventDefault()
        for (var i = 0; i < validation.validation.length; i++) {
            if ((validation.validation[i] === false) && (validation.errorMessage[i] !== "valid")) {
                return
            }
        }
        
        touristService.updateDetailsForTourist(props.id, data);
    
        
    }
    
    return (
        
        <Box border="1px" borderColor="gray.200" p={['5px', '15px', '25px']}>
            <Heading as="h4" size="md" textAlign='center' pb='20px' pt='5px'>Update Details of { props.touristName}</Heading>
             {hasError ? <Alert status="error" mb='20px' >
                <AlertIcon />
                Error
            </Alert> : null}
            <form data-testid="form" action='submit' onSubmit ={onSubmit}>
                <Stack spacing={4}>
                    <Center>
                        <Avatar size="2xl" name="Profile photo" src={props.imageUrl} />
                    </Center>
                     <HStack spacing="10px">
                        <FormControl isRequired>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<AiOutlineUser color="" />} />
                                <Input
                                    data-testid="first_name"
                                    name="first_name"
                                    value={data.first_name}
                                    placeholder={props.first_name}
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
                                    name="last_name"
                                    value={data.last_name}
                                    placeholder={props.last_name}
                                    isInvalid={!validation.validation[1]}
                                    onChange={(e) => handleChange(e)}
                                    errorBorderColor="crimson"
                                />
                            </InputGroup>
                            <FormHelperText color='crimson'>{(validation.errorMessage[1] === "valid") ? "" : validation.errorMessage[1]}</FormHelperText>

                        </FormControl>
                    </HStack>
                    <FormControl isRequired>
                        <Text fontSize="md" color="gray.500">Change mobile number</Text>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<AiOutlinePhone color="" />} />
                            <Input
                                name="phone"
                                value={data.phone}
                                isInvalid={!validation.validation[3]}
                                placeholder={props.phone}
                                onChange={(e) => handleChange(e)}
                                errorBorderColor="crimson"
                                 />
                        </InputGroup>
                        <FormHelperText color='crimson'>{(validation.errorMessage[3]==="valid")?"":validation.errorMessage[3]}</FormHelperText>

                    </FormControl>
                    
                    <FormControl isRequired>
                        <Text fontSize="md" color="gray.500">Change email</Text>
                        <InputGroup>                            
                        <InputLeftElement
                            pointerEvents="none"
                            children={<AiOutlineMail color="" />} />
                            <Input
                                name="email"
                                value={data.email}
                                isInvalid={!validation.validation[2]}
                                placeholder={props.email}
                                onChange={(e) => handleChange(e)}
                                errorBorderColor="crimson"
                                 />
                        </InputGroup>
                        <FormHelperText color='crimson'>{(validation.errorMessage[2] === "valid") ? "" : validation.errorMessage[2]}</FormHelperText>

                     </FormControl>

                    
                    <Button colorScheme='cyan' type="submit">Update Customer</Button>
                </Stack>
                
        </form>
        </Box>
    );
}

export default EditTourist;