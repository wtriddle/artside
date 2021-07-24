import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { CloudinaryContext } from "cloudinary-react";
import { AppProps } from "next/app";
import Head from "next/head";
import theme from "../theme";

// Link to graphql schema sever
const link = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include", // Validation creditials for logged in users sent in the headers of request/responses
});

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          photoStream: {
            // Disable unique keys for incoming stream of photos. All photos should be considered part of the same data
            keyArgs: ["username"],
            // read(existing) {
            //   return existing;
            // },
            merge(existing, incoming) {
              return existing
                ? {
                    __typename: existing.__typename,
                    hasMore: incoming.hasMore,
                    photos: [...existing.photos, ...incoming.photos],
                  }
                : incoming;
            },
          },
        },
      },
    },
  }),
  credentials: "include",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Artside - Your stylish corner of the world</title>
        <link rel="shortcut icon" href="favicon.ico" />
      </Head>
      <CloudinaryContext cloudName="dsqw5kd59">
        <ApolloProvider client={apolloClient}>
          <ChakraProvider resetCSS theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </ApolloProvider>
      </CloudinaryContext>
    </>
  );
}

export default MyApp;

/* 

type Query {
  feed(offset: Int, limit: Int): [FeedItem!]
}


@ObjectType()
class FeedItem {
  @Field(() => [Photo], { nullable: true })
  photos: Photo[];

  @Field(() => Boolean)
  hasMore: boolean;
}


type FeedItem {
  id: String!
  message: String!
}



*/
