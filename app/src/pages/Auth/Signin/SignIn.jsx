import React from 'react';
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { object, string, ref } from 'yup';
import Card from '../../../components/Card';
import { useMutation } from 'react-query';
import { SigninUser } from '../../../api/query/userQuery';
import useAuth from '../../../hooks/useAuth';

const signinValidationSchema = object().shape({
  email: string().required('Email is required').email('Invalid email format'),
  password: string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});



const SignIn = () => {
  const toast=useToast();
  const {login}=useAuth();
  const {mutate,isLoading,error,isError}=useMutation({
    mutationKey:["sigin"],
    mutationFn:SigninUser,
    onSuccess:(data)=>
      {
        const {token}=data;
        login(token);

      },
    onError:(error)=>{
      toast({
        title:"Signup Error",
        description:error.message,
        status:"error",
      });
    },
  })


  return (
    <Container bg="white">
        <Center h="100vh">
          <Card>
            <Stack gap="4px">
            <Text textStyle="h1" color="p.black" fontWeight="medium">
              Welcome to Crypto App
            </Text>
            <Text fontSize="sm" color="black.60" mt="4">
            Enter your credentials to access the account.
            </Text>
            </Stack>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={(values) => {
                mutate(values)
              }}
              validationSchema={signinValidationSchema}
            >
              {({ errors, touched }) => (
                <Form>
                  <Stack spacing="24px">
                    <Field name="email">
                      {({ field }) => (
                        <FormControl isInvalid={errors.email && touched.email}>
                          <FormLabel>Email</FormLabel>
                          <Input {...field} type="email" placeholder="Enter your email..." />
                          <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field }) => (
                        <FormControl isInvalid={errors.password && touched.password}>
                          <FormLabel>Password</FormLabel>
                          <Input {...field} type="password" placeholder="Enter your password..." />
                          <FormErrorMessage>{errors.password}</FormErrorMessage>
                        </FormControl>
                      )}
                      </Field>
                    <HStack justifyContent="space-between">
                        <Checkbox fontStyle="p3">Remember me</Checkbox>
                        <Link href="/forget-password"><Text fontStyle="p3" color="p.purple">Forget password?</Text></Link>
                    </HStack>
                    <Stack>
                        <Button w="full" type="submit" isLoading={isLoading}>
                      Log In
                    </Button>
                   <Link href="/signup"> <Button w="full" variant="outline" >
                      Create New Account
                    </Button></Link>
                    </Stack>
                    
                  </Stack>
                </Form>
              )}
            </Formik>
          </Card>
        </Center>
        </Container>
      );
    };

export default SignIn