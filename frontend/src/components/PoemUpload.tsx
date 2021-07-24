import {
  Heading,
  Box,
  Center,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, ErrorMessage, useField } from "formik";
import React from "react";
import { useUploadPoemMutation } from "../generated/graphql";
import { InputField } from "./InputField";

type PoemEntryFieldProps = {
  name: string;
  type: string;
  id: string;
  placeholder: string;
  label: string;
};

const PoemEntryField: React.FC<PoemEntryFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>Poem</FormLabel>
      <Textarea h={400} w={"250%"} {...props} {...field} />
      {error ? (
        <ErrorMessage name={props.name}>{() => error}</ErrorMessage>
      ) : null}
    </FormControl>
  );
};

export const PoemUpload: React.FC = () => {
  const [uploadPoem] = useUploadPoemMutation();
  const toast = useToast();
  return (
    <>
      <Heading>Upload a Poem</Heading>
      <div>Put file and text poem uploading options here</div>

      <Formik
        initialValues={{ poem: "", title: "" }}
        onSubmit={async (values) => {
          const resp = await uploadPoem({
            variables: {
              inputs: {
                poem: values.poem,
                title: values.title,
              },
            },
          });
          if (resp.errors) {
            console.log(resp.errors);
            return;
          } else {
            // const generatePhotoLink = genLink(); Link to new photo under user
            toast({
              description:
                "Success! Poem uploaded! Check out the poem at the link .... <- Insert link here",
              position: "bottom",
              isClosable: true,
              status: "success",
              title: "Success!",
            });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mb={6} mr={400}>
              <InputField
                name="title"
                type="text"
                id="title"
                placeholder="title"
                label="title"
              />
              <InputField
                name="description"
                textArea
                type="text"
                id="description"
                placeholder="description"
                label="description"
              />
              <PoemEntryField
                name="poem"
                type="text"
                id="poem"
                placeholder="poem"
                label="poem"
              />
            </Box>
            <Center>
              <Button mb={12} isLoading={isSubmitting} type="submit">
                Submit
              </Button>
            </Center>
          </Form>
        )}
      </Formik>
    </>
  );
};
