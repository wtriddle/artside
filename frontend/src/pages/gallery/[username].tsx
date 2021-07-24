import {
  Box,
  Button,
  Center,
  Heading,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { Image } from "cloudinary-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { NavBar } from "../../components/NavBar";
import { ProfilePicture } from "../../components/ProfilePicture";
import { useGetUserQuery, usePhotoStreamQuery } from "../../generated/graphql";
const date: string = new Date(Date.now()).toISOString();

const ProfilePage: NextPage = () => {
  const router = useRouter();
  console.log(router);
  const { data, loading, fetchMore } = usePhotoStreamQuery({
    variables: {
      date,
      n: 3,
      username: router.query.username
        ? (router.query.username as string)
        : null,
    },
  });

  const { data: userData, loading: userLoading } = useGetUserQuery({
    variables: {
      options: {
        usernameOrEmail:
          typeof router.query.username === typeof ""
            ? (router.query.username as string)
            : "",
      },
    },
  });

  if (!loading && !userLoading) {
    return data?.photoStream && userData?.getUser ? (
      <>
        <NavBar />
        <Stack>
          <Center mt={4}>
            <ProfilePicture user={userData?.getUser} variant="large" />
          </Center>
          <Center>
            <Heading>{router.query.username}'s Gallery </Heading>
          </Center>
          <SimpleGrid columns={3} spacing={6}>
            {data?.photoStream.photos?.map((p) => (
              <Box key={p.id}>
                <Image
                  publicId={"photos/" + p.id}
                  width="400"
                  height="400"
                  radius="20"
                />
              </Box>
            ))}
          </SimpleGrid>
          {data?.photoStream.hasMore ? (
            <Button
              onClick={async () => {
                if (data?.photoStream.photos != null) {
                  fetchMore({
                    variables: {
                      date:
                        data?.photoStream.photos[
                          data.photoStream.photos?.length - 1
                        ].createdAt,
                      n: 3,
                      username: router.query.username
                        ? (router.query.username as string)
                        : null,
                    },
                  });
                }
              }}
              isLoading={loading}
            >
              Load More
            </Button>
          ) : null}
        </Stack>
      </>
    ) : (
      <>
        <NavBar />
        <Heading>User could not be found</Heading>
      </>
    );
  } else {
    return <Heading>Loading...</Heading>;
  }
};

export default ProfilePage;
