import { Center, Heading, Stack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { ProfilePictureUpload } from "../../components/ProfilePictureUpload";
import { NavBar } from "../../components/NavBar";
import { ProfilePicture } from "../../components/ProfilePicture";
import { useGetUserQuery, useMeQuery } from "../../generated/graphql";

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { data, loading } = useGetUserQuery({
    variables: {
      options: {
        usernameOrEmail:
          typeof router.query.username === typeof ""
            ? (router.query.username as string)
            : "",
      },
    },
  });

  const { data: meData, loading: meLoading } = useMeQuery();

  if (!loading && !meLoading) {
    return data?.getUser ? (
      <>
        <NavBar />
        <Stack>
          <Center mt={4}>
            <ProfilePicture user={data.getUser} variant="large" />
          </Center>
          {meData?.me?.id === data.getUser.id ? <ProfilePictureUpload /> : ""}
          <Center>
            <Heading>Hello, {data?.getUser?.username}</Heading>
          </Center>
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
