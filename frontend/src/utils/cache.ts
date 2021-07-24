import { InMemoryCache, Reference, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem("qid"));
