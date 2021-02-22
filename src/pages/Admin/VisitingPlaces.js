import React, { useEffect, useState } from "react";
import { Box, Center, Heading, Button, ReactRouterLink, Text } from "@chakra-ui/react";
import VisitingPlaceCard from "../../components/Admin/VisitingPlaceCard";
import SearchBar from "../../components/Admin/SearchBar";
import { Link } from 'react-router-dom';
import { AddIcon } from "@chakra-ui/icons";
import { visitingPlaceService } from "../../services/visitingplaceService";




function VisitingPlaces() {
    const [visitingPlaces, setVisitingPlaces] = useState([]);
    const [hasError, setErrors] = useState(false);

    const [search, setSearch] = useState('');

    const handleChange = (event)=>{    
        var value = event.target.value;
        setSearch(value);
        searchData({similarTo: value});
 

    }

    const fetchData = async () => {
        visitingPlaceService.getVisitingPlaces()
            .then((result) => {
                if (result.success) {
                    setVisitingPlaces(result.visitingPlaces);
                } else {
                    setErrors(result.status);
                }
            });
    }
    const searchData = async (quary) => {
        visitingPlaceService.getVisitingPlacesByName(quary)
            .then((result) => {
                if (result.success) {
                    setVisitingPlaces(result.visitingPlaces);
                } else {
                    setErrors(result.status);
                }
            });
    }
    useEffect(() => {
        fetchData();
    },[]);
    return (
        <>
            <Button position="fixed" bottom="50px" right="50px" zIndex='1000' leftIcon={<AddIcon />} colorScheme="teal">
                <Link as={ReactRouterLink} to='/addvisitingplace'>Add Visiting Place</Link>
            </Button>
            <Center w="100%" h="auto" p={4}  pb='300px'>
                <Box w="90%" h="auto" borderWidth="1px" borderRadius="lg" p='10px'>
                    <Heading ml='20px' mb='20px'>Visiting Places</Heading>
                    <Center >
                        <SearchBar text='Search visiting place...' value={search} onChange={(event)=>handleChange(event)}/>
                    </Center>
                    {visitingPlaces.length === 0 ? <Box p='15px' bg='red.200' borderRadius='lg'><Text fontSize='sm' color="yellow.800">No visiting places</Text></Box>:null}
                    {visitingPlaces.map((place, i) => (
                        <VisitingPlaceCard
                            id={place._id}
                            placeName={place.name}
                            description={place.description}
                            latitude={place.location.coordinates[0]}
                            longitude={place.location.coordinates[1]}
                            distance={place.distance}
                            methods={place.travellingMethods}
                            timeToReach={place.timeToReach}
                            imageUrl='./1.jpg'
                            fetch={fetchData}
                            role='admin'
                        />
                    ))
                    }

                </Box>

            </Center>
        </>

    );

}

export default VisitingPlaces;