import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { NavBar } from "../components/NavBar";
import { useRegisterMutation } from "../generated/graphql";
import { getFormikErrors } from "../utils/getFormikErrors";
import { updateMeCache } from "../utils/updateMeCache";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [register] = useRegisterMutation({
    update(cache, { data }) {
      updateMeCache(cache, data?.register.user);
    },
  });
  const router = useRouter();

  return (
    <>
      <NavBar />
      <Center mt={8}>
        <Heading size="4xl">Register</Heading>
      </Center>

      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        onSubmit={async (values, actions) => {
          const options = {
            email: values.email,
            username: values.username,
            password: values.password,
          };
          const { data } = await register({ variables: { options } });
          if (data?.register.errors) {
            let formikErrors = getFormikErrors(data?.register.errors);
            actions.setErrors(formikErrors);
          } else {
            router.back();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box maxW="800px" w="100%" mt={8} mx="auto" mb={10}>
              <Box>
                <InputField
                  id="email"
                  name="email"
                  placeholder="email"
                  label="Email"
                  type="email"
                />
              </Box>
              <Box>
                <InputField
                  id="username"
                  name="username"
                  placeholder="username"
                  label="Username"
                  type="username"
                />
              </Box>
              <Box>
                <InputField
                  id="password"
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Center>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Register
                </Button>
              </Center>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
