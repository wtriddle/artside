import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProfilePictureUploadMutation } from "../generated/graphql";

export const ProfilePictureUpload: React.FC = () => {
  const fileInput: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  const [uploadProfilePicture, { loading }] = useProfilePictureUploadMutation();
  const [error, setError] = useState("");
  const toast = useToast();

  const readFile = async (file: File) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const resp = await uploadProfilePicture({
        variables: {
          file: reader.result as string,
        },
      });
      if (resp.errors) {
        console.log(resp.errors.map((v) => setError(v.message)));
      }
    };
  };

  return (
    <Stack alignItems="center" justifyContent="center" verticalAlign="center">
      <Box>
        <FormControl isInvalid={!!error} id="photo">
          <FormLabel>Upload a Profile Picture</FormLabel>
          <Input size="lg" type="file" id="photo" ref={fileInput} />
          <FormHelperText>
            Please input a .jpg, .png, or .xl file
          </FormHelperText>
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      </Box>
      <Button
        onClick={async () => {
          if (fileInput.current?.files != null) {
            await readFile(fileInput.current.files[0]).then(() => {
              toast({
                description:
                  "Photo uploaded! Refresh the page to see the updated changes!",
                duration: 5000,
                status: "success",
              });
            });
          } else {
            setError("Upload a .jpg or .png file please");
          }
        }}
        isLoading={loading}
      >
        Submit your photo!
      </Button>
    </Stack>
  );
};
