import React, { useEffect, useState }  from "react";
import { Box, Center, Heading,} from "@chakra-ui/react";
import TouristsTable from "../../components/Admin/TouristsTable";
import SearchBar from "../../components/Admin/SearchBar";
import { touristService } from "../../services/touristService";

const Tourists=()=> {
  const [tourists, setTourists] = useState([]);
  const [hasError, setErrors] = useState(false);

  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    var value = event.target.value;
    setSearch(value);
  }

  const fetchData = async () => {
    touristService.getTourists()
      .then((result) => {
        if (result.success) {
          setTourists(result.tourists);
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

      <Center w="100%" h="auto" p={4}  pb='300px'>
        <Box w="90%" h="auto" borderWidth="1px" borderRadius="lg" p='10px'>
          <Heading ml='20px' mb='20px'>Tourists</Heading>
          <Center >
            <SearchBar text='Search Tourists...' />
          </Center>
          <TouristsTable tourists={tourists}/>

        </Box>

      </Center>
    </>

  );

}

export default Tourists;