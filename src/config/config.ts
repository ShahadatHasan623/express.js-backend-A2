import dotenv from "dotenv";

dotenv.config({ quiet: true });

const config = {
  port: process.env.PORT as string,
  CONNECTION_DB: process.env.DATABASE_CONNECTION as string,
};

export default config;
