import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { NavBar } from "../components/NavBar";
import { useLoginMutation } from "../generated/graphql";
import { getFormikErrors } from "../utils/getFormikErrors";
import { updateMeCache } from "../utils/updateMeCache";

type LoginPageProps = {};

const Login: React.FC<LoginPageProps> = ({}) => {
  const [login] = useLoginMutation({
    update(cache, { data }) {
      updateMeCache(cache, data?.login.user);
    },
  });
  const router = useRouter();
  return (
    <>
      <NavBar />
      <Center mt={8}>
        <Heading size="4xl">Login</Heading>
      </Center>

      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, actions) => {
          const options = {
            usernameOrEmail: values.usernameOrEmail,
            password: values.password,
          };
          const { data } = await login({ variables: { options } });
          console.log(data);
          if (data?.login.errors) {
            let formikErrors = getFormikErrors(data?.login.errors);
            actions.setErrors(formikErrors);
          } else {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box maxW="800px" w="100%" mt={8} mx="auto" mb={10}>
              <Box>
                <InputField
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  placeholder="username or email"
                  label="Username or Email"
                  type="usernameOrEmail"
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
                  Login
                </Button>
              </Center>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
