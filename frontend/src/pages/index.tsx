import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  HStack,
  Link,
  Tag,
} from "@chakra-ui/react";
import { Image } from "cloudinary-react";
import NextLink from "next/link";
import React, { useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { ProfilePicture } from "../components/ProfilePicture";
import { usePhotoStreamQuery } from "../generated/graphql";

const date: string = new Date(Date.now()).toISOString();
const width: string = "450px";

const resizeGridItem = (item: any) => {
  let grid = document.getElementsByClassName("grid")[0];
  let rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
  );
  let rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
  );
  let rowSpan = Math.ceil(
    (item.querySelector(".content").getBoundingClientRect().height + rowGap) /
      (rowHeight + rowGap)
  );
  item.style.gridRowEnd = "span " + rowSpan;
};

const Index = () => {
  let { data, loading, fetchMore } = usePhotoStreamQuery({
    // Initial query results
    variables: {
      date,
      username: null,
      n: 6,
    },
  });

  useEffect(() => {
    let allItems = document.getElementsByClassName("item");
    for (let x = 0; x < allItems.length; x++) {
      resizeGridItem(allItems[x]);
    }
  }, [data]);

  console.log(data);
  return (
    <>
      <NavBar />
      {/* <InfiniteScroll
        dataLength={3}
        hasMore={data?.stream.hasMore as boolean}
        next={async () => {
          if (data?.stream.photos != null) {
            fetchMore({
              variables: {
                date:
                  data?.stream.photos[data.stream.photos?.length - 1].createdAt,
                n: 3,
              },
            });
          }
        }}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      > */}
      <Grid
        className="grid"
        mb={5}
        mt={5}
        ml={10}
        gap={6}
        templateColumns="repeat(auto-fill, minmax(450px, 1fr))"
        autoRows="10px"
      >
        {data?.photoStream.photos?.map((p) => (
          // if(p.type == "music")
          // render music post
          // if(p.type == "photo")
          // render photo post
          // if(p.type == "poem")
          // render poem post
          <div className="item">
            <Box
              className="content"
              key={p.id}
              px={4}
              w={width}
              borderWidth="1px"
              borderRadius="5px"
            >
              <Heading>{p.title}</Heading>
              <Tag>{new Date(p.createdAt).toLocaleString()}</Tag>
              <Image
                publicId={"photos/" + p.id}
                width={width}
                height="400"
                radius="20"
              />
              <Box>
                <Box w={width}>
                  <HStack m={3}>
                    <ProfilePicture
                      user={p.user}
                      variant="small"
                    ></ProfilePicture>
                    <NextLink
                      href="/gallery/[username]"
                      as={"/gallery/" + p.user.username}
                    >
                      <Link>{p.user.username}</Link>
                    </NextLink>
                  </HStack>
                  <Box ml={6} mb={4}>
                    {p.description}
                  </Box>
                </Box>
              </Box>
            </Box>
          </div>
        ))}
      </Grid>
      {/* </InfiniteScroll> */}
      {data?.photoStream.hasMore ? (
        <Center>
          <Button
            mb={4}
            onClick={async () => {
              if (data?.photoStream.photos != null) {
                fetchMore({
                  variables: {
                    date:
                      data?.photoStream.photos[
                        data.photoStream.photos?.length - 1
                      ].createdAt,
                    n: 3,
                  },
                });
              }
            }}
            isLoading={loading}
          >
            Load More
          </Button>
        </Center>
      ) : null}
    </>
  );
};

export default Index;

/* Concatinate the photos, and invalidate the hasMore or reset the hasMore to the most recently fetched hasMore */
