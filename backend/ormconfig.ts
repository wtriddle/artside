import { createConnection } from "typeorm";

export default {
  type: "postgres",
  username: "postgres",
  password: "123",
  database: "artside",
  logging: true,
  entities: [__dirname + "/entity/**/*.js"],
  migrations: [__dirname + "./migrations/*"],
  synchronize: true,
} as Parameters<typeof createConnection>[0];
