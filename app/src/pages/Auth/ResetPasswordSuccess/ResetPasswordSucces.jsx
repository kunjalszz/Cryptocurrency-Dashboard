import React from 'react'
import { Box, Button, Center, Container, Icon, Text, VStack } from '@chakra-ui/react' 
import Card from '../../../components/Card'
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';

const ResetPasswordSucces = () => {
  
  return (
    <Container>
    <Center minH="100vh">
  <Card  p={{
      base:4,
      md:10
    }}
    showCard={true}>
     <VStack spacing={6}>
     <Icon as={IoCheckmarkCircleSharp} boxSize="48px" color="#059669"/>
     <Text  color="p.black" textStyle="h4" fontWeight="medium">Password Reset Done</Text>
     <Text  textAlign="center" color="black.60" textStyle="p2">Now you can access you account. </Text>
     <Box w="full"><Link to="/signin"><Button w="full">Sign in</Button></Link></Box>
     </VStack>   
</Card>
</Center>
  </Container>
  )
}

export default ResetPasswordSucces