import dotenv from "dotenv";

dotenv.config({ quiet: true });

const config = {
  port: process.env.PORT as string,
  CONNECTION_DB: process.env.DATABASE_CONNECTION as string,
  JWT_TOKEN :process.env.JWT_TOKEN as string,
  REFRESH_TOKEN:process.env.JWT_REFRESH_TOKEN_SECRET as string
};

export default config;
