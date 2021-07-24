import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { data, loading: meLoading } = useMeQuery();

  const router = useRouter();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();

  let loginButtons = null;

  if (data && !meLoading) {
    loginButtons = (
      <Flex alignItems="center">
        <Box>
          <NextLink
            href="/gallery/[username]"
            as={"/gallery/" + data.me?.username}
          >
            <Button>
              <Link>My Gallery</Link>
            </Button>
          </NextLink>
        </Box>
        <Box ml={4}>
          <NextLink
            href="/profile/[username]"
            as={"/profile/" + data.me?.username}
          >
            <Button>
              <Link>Edit Profile</Link>
            </Button>
          </NextLink>
        </Box>
        <Box ml={4}>
          <NextLink href="/uploadart">
            <Button>
              <Link>Upload Art</Link>
            </Button>
          </NextLink>
        </Box>
        <Box ml={4}>
          <Button
            isLoading={logoutLoading}
            onClick={async () => {
              await logout();
              router.reload();
            }}
          >
            Logout
          </Button>
        </Box>
      </Flex>
    );
  } else if (meLoading) {
    loginButtons = <div>loading...</div>;
  }
  if (!data?.me && !meLoading) {
    loginButtons = (
      <Flex>
        <Box>
          <NextLink href="/register">
            <Link>
              <Button>Register</Button>
            </Link>
          </NextLink>
        </Box>
        <Box ml={4}>
          <NextLink href="/login">
            <Link>
              <Button>Login</Button>
            </Link>
          </NextLink>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      p={6}
      bg="#4f153a"
      align="center"
    >
      {/* <Box mr={"auto"}>
        <DarkModeSwitch />
      </Box> */}
      <NextLink href="/">
        <Box mr={"auto"}>
          <Link>
            <Heading>ArtSide</Heading>
          </Link>
        </Box>
      </NextLink>
      <Box ml={"auto"}>{loginButtons}</Box>
    </Flex>
  );
};
