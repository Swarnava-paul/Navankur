import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { setUserInfo } from "../../App/appSlice";
import { useAppDispatch , useAppSelector} from "../../App/hook";
import { useNavigate } from "react-router";
import { Box, Flex, Input, Text, Container , Grid , HStack , VStack , Button} from "@chakra-ui/react";
import { Avatar, AvatarGroup} from "@chakra-ui/react"

const EmployerDashBoard:React.FC = () => {

    interface createdJob{
      CompanyName : string,
      IsHiringOpen : boolean,
      JobDescription:string,
      JobTitle:string
      _id:string
    }; // this kind of data will come from backend
    const FirstName = useAppSelector((state)=>state.app.userInfo.FirstName);
    const dispatch = useAppDispatch();
    const[createdJobs,setCreatedJobs] = useState<createdJob[]>([]); // secure the state by setting type
    const navigate = useNavigate();

    async function getUserDetails() {
        try{
          //
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URI}/user/v1/profile`,{
            headers: {
                'Authorization':`Bearer ${token}`
              }
          });
          dispatch(setUserInfo(response.data.FirstName));
        }catch(error) {
          // 
          navigate('/login')
        } 
    };
    async function getAllCreatedActiveJobs() {
      const token = localStorage.getItem('token');
        try{
           const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URI}/job/v1/createdJobs`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
           });
           setCreatedJobs(response.data.createdJobs);
        }catch(error){
            alert('Error During Loading Created Jobs')
        }
    };

    useEffect(()=>{
      getUserDetails();
      getAllCreatedActiveJobs();
    },[]);

    return (
    <>
     <Box minH="100vh" bg="gray.100">
      {/* Navbar */}
      <Flex bg="white" boxShadow="md" p={4} align="center" justify="space-between">
        <Text fontSize="2xl" fontWeight="bold" color="blue.600">
          Job Platform
        </Text>
        
        {/* User Info */}
       <Flex alignItems='center' justify='space-between' w='12%'>
        <Text>{FirstName}</Text>
       <Avatar.Root size='2xl' colorPalette='blue'>
      <Avatar.Fallback name={FirstName} />
      <Avatar.Image  />
     </Avatar.Root>
       </Flex>
      </Flex>

      {/* Search Bar */}
      <Container maxW="lg" mt={20}>
      </Container>
      <PostJob/>
      <JobCart createdJobs={createdJobs}/>
    </Box>
    </>
    );
};


const JobCart: React.FC = ({ createdJobs }) => {
  const jobsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(createdJobs.length / jobsPerPage);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = createdJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <Box marginTop="46px" padding="20px">
      <Text fontSize="24px" fontWeight="bold" fontFamily="sans-serif" marginBottom="16px">
        Posted Jobs
      </Text>

      <Grid
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap={6}
      >
        {currentJobs.map(({ JobTitle, JobDescription, CompanyName }, index) => (
          <Box
            key={index}
            borderRadius="10px"
            padding="20px"
            boxShadow="lg"
            border="1px solid #ddd"
            transition="0.3s"
            _hover={{ transform: "scale(1.02)", boxShadow: "xl" }}
          >
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold" fontSize="18px" color="blue.600">
                {CompanyName}
              </Text>
              <Text fontSize="16px" fontWeight="semibold">{JobTitle}</Text>
              <Text fontSize="14px" color="gray.600">
                {JobDescription.split(" ").slice(0, 10).join(" ")}...
              </Text>
              <HStack justify="space-between" width="100%">
                <Button size="sm" colorScheme="blue">View More</Button>
              </HStack>
            </VStack>
          </Box>
        ))}
      </Grid>

      {/* Pagination Controls */}
      <HStack justify="center" marginTop="20px" spacing={4}>
        <Button
          size="sm"
          colorScheme="gray"
          isDisabled={currentPage === 1}
          onClick={() => setCurrentPage((currentPage)=>{
            if(currentPage > 1) {
              return currentPage = currentPage-1;
            }else{
              return currentPage
            }
          })}
        >
          Previous
        </Button>
        <Text fontSize="14px">
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          size="sm"
          colorScheme="gray"
          isDisabled={currentPage === totalPages}
          onClick={() => setCurrentPage((currentPage)=> {
            if(currentPage === totalPages) {
              return currentPage
            }else{
              currentPage = currentPage+1
              return currentPage
            }
          })}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};


const PostJob = () => {
  return(
    <>
      <Box padding='10px' w='300px' margin='auto' marginTop='7%' display='grid'
      placeItems='center' bg='RGB(31, 99, 235)' height='25vh' borderRadius='20px'
      cursor='pointer'>
      <i className="fa-solid fa-pencil" style={{color:"white",fontSize:"20px"}}></i>
      <Text color='white'>Post New Job</Text>
      </Box>
    </>
  )
}

export default EmployerDashBoard;

