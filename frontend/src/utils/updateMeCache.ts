import { ApolloCache } from "@apollo/client/cache";
import { LoginMutation, RegisterMutation } from "../generated/graphql";

interface updateMeCacheProps<T> {}

export const updateMeCache = (
  cache: ApolloCache<LoginMutation | RegisterMutation>,
  user: any
) => {
  cache.modify({
    fields: {
      me() {
        return user;
      },
    },
  });
};
