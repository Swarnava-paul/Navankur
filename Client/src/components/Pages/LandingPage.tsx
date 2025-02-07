import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Stack,
} from "@chakra-ui/react";
import { FaBriefcase } from "react-icons/fa";
import { Link } from "react-router";
const LandingPage: React.FC = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box bgGradient="linear(to-r, blue.500, purple.500)" py={20} color="white">
        <Container maxW="container.lg" textAlign="center">
          <Heading size="2xl">Find Your Dream Job</Heading>
          <Text fontSize="lg" mt={4}>
            Explore thousands of job opportunities and hire top talents effortlessly.
          </Text>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.lg" py={16}>
        <Stack direction={{ base: "column", md: "row" }} spacing={10} align="center">
          <VStack align="start" spacing={4}>
            <Heading size="lg">Why Choose Us?</Heading>
            <Text>
              - Wide range of job listings from top companies.
              <br />- Easy and quick application process.
              <br />- AI-driven job matching system.
            </Text>
            <Button colorScheme="blue" size="lg" leftIcon={<FaBriefcase />}>
              <Link to="/register">Post a Job</Link>
            </Button>
          </VStack>
        </Stack>
      </Container>

      {/* Call to Action Section */}
      <Box bg="gray.100" py={12} textAlign="center">
        <Heading size="lg">Join Now & Kickstart Your Career</Heading>
        <Text fontSize="md" mt={2}>
          Sign up today and connect with top employers.
        </Text>
        <Button mt={4} colorScheme="green" size="lg" display="block" mx="auto">
        <Link to="/register">Register with us</Link>
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
