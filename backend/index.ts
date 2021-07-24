import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { MyContext } from "MyContext";
import "reflect-metadata";
import { PoemResolver } from "./resolvers/poem";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, PORT, __prod__ } from "./constants";
import TypeORMconfig from "./ormconfig";
import { UserResolver } from "./resolvers/user";
import { PhotoResolver } from "./resolvers/photo";
import { Poem } from "./entity/Poem";

const main = async () => {
  await createConnection(TypeORMconfig);

  // await Poem.delete({});
  // await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  // Cross-Origin request solution to server and client communication
  app.use(
    cors({
      // Apply middleware on all routes
      origin: "http://localhost:3000", // Allow cross origin requests on express, globally
      credentials: true, // accept credientials on server
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // Ten years cookie length
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__, // Cookie only works in https
      },
      secret: ["fjidsanjmcfv9043nmf90n4093j1nf0943n2"],
      resave: false,
      saveUninitialized: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PoemResolver, PhotoResolver],
      validate: false, // Supress class-validator error messages
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
    },
    bodyParserConfig: { limit: "64mb", type: "application/json" },
  });

  app.listen(PORT, () => {
    console.log("This server is running!", PORT);
  });
};

main().catch((err) => {
  console.log("Errors are ", err);
});
