import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Link,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import React, { useState } from "react";
import { PhotoUpload } from "../components/PhotoUpload";
import { NavBar } from "../components/NavBar";
import { PoemUpload } from "../components/PoemUpload";
import { RadioCard } from "../components/RadioCard";
import { useMeQuery } from "../generated/graphql";

type UploadArtProps = {};

const UploadArt: NextPage<UploadArtProps> = () => {
  const artOptions = ["Poetry", "Photo", "Music"];
  const [uploadType, setUploadType] = useState("Poetry");
  const { data, loading } = useMeQuery();
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "Poetry",
    onChange: (data) => {
      setUploadType(data as string);
    },
  });
  const group = getRootProps();

  if (!loading && !data?.me) {
    return (
      <>
        <NavBar />
        <Center>
          <div>Oops! You are not logged in! Please login to upload artwork</div>
          <Box>
            <NextLink href="/">
              <Button>
                <Link>Back</Link>
              </Button>
            </NextLink>
          </Box>
        </Center>
      </>
    );
  }

  let UploadScheme = <div>loading...</div>;

  if (uploadType == "Poetry") {
    UploadScheme = <PoemUpload />;
  }
  if (uploadType == "Photo") {
    UploadScheme = (
      <>
        <Heading>Upload a Photo</Heading>
        <div>Photo uploading options here</div>
        <PhotoUpload />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <VStack>
        <Heading>
          {/* Biggest header */}
          Upload Artwork
        </Heading>

        <Heading>Select a type of Artwork</Heading>

        <HStack {...group}>
          {artOptions.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            );
          })}
        </HStack>
        {UploadScheme}
      </VStack>
    </>
  );
};

export default UploadArt;
