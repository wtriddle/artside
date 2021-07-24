import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { usePhotoUploadMutation } from "../generated/graphql";
import { InputField } from "./InputField";

export const PhotoUpload: React.FC = () => {
  const fileInput: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  const [photo, setPhoto] = useState("");
  const [uploadPhoto] = usePhotoUploadMutation();
  const [error, setError] = useState("");
  const toast = useToast();

  async function displayPhoto() {
    if (fileInput.current?.files == null) return null;
    const file: File | null = fileInput?.current?.files[0]
      ? fileInput.current.files[0]
      : null;
    if (file == null) return null;
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      setPhoto(reader.result as string);
    };
  }

  return (
    <Stack alignItems="center" justifyContent="center" verticalAlign="center">
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        onSubmit={async (values) => {
          if (!photo) {
            setError("Please input a photo to upload");
            return;
          }
          const resp = await uploadPhoto({
            variables: {
              file: photo,
              title: values.title,
              description: values.description,
            },
          });
          if (resp.errors) {
            console.log(resp.errors);
            return;
          } else {
            // const generatePhotoLink = genLink(); Link to new photo under user
            toast({
              description:
                "Success! Photo uploaded! Check out the photo at the link .... <- Insert link here",
              position: "bottom",
              isClosable: true,
              status: "success",
              title: "Success!",
            });
          }
          console.log(resp);
          return;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              type="text"
              id="title"
              placeholder="Title"
              label="Title"
            />
            <InputField
              name="description"
              type="text"
              id="description"
              textArea
              placeholder="Description"
              label="Description"
            />
            <Box>
              <FormControl isInvalid={!!error}>
                <FormLabel>Photo</FormLabel>
                <Input
                  onChange={displayPhoto}
                  size="lg"
                  type="file"
                  id="photo"
                  ref={fileInput}
                  mb={4}
                />
                {photo != null ? <Image src={photo}></Image> : null}
                <FormHelperText>
                  Please input a .jpg, .png, or .xl file
                </FormHelperText>
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
            </Box>
            <Center>
              <Button mb={12} type="submit" isLoading={isSubmitting}>
                Submit your photo!
              </Button>
            </Center>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
