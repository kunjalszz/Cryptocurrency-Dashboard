import React from 'react';
import {
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
import { object, string } from 'yup';
import Card from '../../../components/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyForgetPasswordReset } from '../../../api/query/userQuery';
import { useMutation } from 'react-query';

const forgetPasswordValidationSchema = object().shape({
  'new-password': string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  'repeat-new-password': string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

const ResetPassword = () => {
  const toast = useToast();
  const { token } = useParams();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    queryKey: ["verify-forget-token"],
    queryFn: () => verifyForgetPasswordReset({ token }),
    enabled: !!token,
    onError: (error) => {
      toast({
        title: "SignUp Error",
        description: error.message,
        status: "error",
      });

      navigate("/reset-password-success");
    },
  });

  if (isLoading)
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );

  return (
    <Container bg="white">
      <Center h="100vh">
        <Card>
          <Stack gap="4px">
            <Text textStyle="h1" color="p.black" fontWeight="medium">
              Reset Password
            </Text>
            <Text fontSize="sm" color="black.60" mt="4">
              Enter your new password.
            </Text>
          </Stack>
          <Formik
            initialValues={{
              'new-password': '',
              'repeat-new-password': '',
            }}
            onSubmit={(values) => {
              console.log(values);
              mutate({token,password:values.password})
            }}
            validationSchema={forgetPasswordValidationSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <Stack spacing="24px">
                  <Field name="new-password">
                    {({ field }) => (
                      <FormControl isInvalid={errors['new-password'] && touched['new-password']}>
                        <FormLabel>New Password</FormLabel>
                        <Input {...field} type="password" placeholder="Enter your password..." />
                        <FormErrorMessage>{errors['new-password']}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="repeat-new-password">
                    {({ field }) => (
                      <FormControl isInvalid={errors['repeat-new-password'] && touched['repeat-new-password']}>
                        <FormLabel>Repeat New Password</FormLabel>
                        <Input {...field} type="password" placeholder="Enter your password..." />
                        <FormErrorMessage>{errors['repeat-new-password']}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                    <Link href="/reset-password-success">
                      <Button w="full" variant="outline">
                        Reset Password
                      </Button>
                    </Link>
                </Stack>
              </Form>
            )}
          </Formik>
        </Card>
      </Center>
    </Container>
  );
};

export default ResetPassword;
