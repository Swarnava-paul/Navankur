import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  Flex,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router";
const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const[credientialErr,setCredientialErr]=useState<string>('');
  const [loading,setLoading] = useState<boolean>(false)
  const navigate = useNavigate();

  function generateCaptcha() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };
  async function login() {
    setLoading(true)
    try {
      //
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URI}/auth/v1/login`,{
        email,password
      });
      setTokenToLocalStorage(response.data.token)
    }catch(error) {
      //
      setCredientialErr('Wrong Credientials');
      setTimeout(()=>{
        setCredientialErr('')
      },4000);
    }finally{
      setLoading(false)
    }
  };
  function setTokenToLocalStorage(token) {
    JSON.stringify(localStorage.setItem('token',token));
    navigate('/home/jobSeeker')
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (captchaInput !== captcha) {
      setError("Incorrect Captcha. Please try again.");
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      return;
    }
    setError("");
    //alert("Login Successful!");
    // make network request
    login();
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-r, blue.500, teal.500)"
    >
      <Box bg="white" p={8} rounded="lg" shadow="lg" w="full" maxW="md">
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <Heading as="h2" size="lg" color="gray.700">
            Login
          </Heading>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            focusBorderColor="blue.500"
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            focusBorderColor="blue.500"
          />
          <Text color='red' marginRight='-50%'>{credientialErr}</Text>
          <Box w="full">
            <Text mb={1}>Captcha:</Text>
            <Badge fontSize="lg" colorScheme="purple" px={3} py={1} borderRadius="md">
              {captcha}
            </Badge>
          </Box>
          <Input
            placeholder="Enter Captcha"
            type="text"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
            focusBorderColor="blue.500"
          />
          {error && <Text color="red.500">{error}</Text>}
          <Button type="submit" colorScheme="blue" w="full">
            {loading == true ? (<i className="fa-solid fa-spinner fa-spin" style={{color:'white',fontSize:"25px"}}></i>):(
              'Login'
            )}
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginPage;
