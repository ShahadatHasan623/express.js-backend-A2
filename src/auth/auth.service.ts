import { pool } from "../db/data";
import type { ILogin, IUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config/config";

const signupUser = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const hasPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,COALESCE($4,'contributor')) RETURNING *`,
    [name, email, hasPassword, role],
  );
  return result;
};

const loginUser = async (payload: ILogin) => {
  const { email, password } = payload;

  const userData = await pool.query(
    `SELECT * FROM users WHERE email=$1`,
    [email]
  );

  if (userData.rows.length === 0) {
    throw new Error("Invalid Credentials !");
  }

  const user = userData.rows[0];

  const matchPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!matchPassword) {
    throw new Error("Invalid Credentials !");
  }

  const JwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    email: user.email,
  };

  // Access Token
  const accessToken = jwt.sign(
    JwtPayload,
    config.JWT_TOKEN as string,
    {
      expiresIn: "1d",
    }
  );

  // Refresh Token
  const refreshToken = jwt.sign(
    JwtPayload,
    config.REFRESH_TOKEN as string,
    {
      expiresIn: "7d",
    }
  );

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const generateRefreshToken = async (token: string) => {
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(
    token,
    config.REFRESH_TOKEN as string,
  ) as JwtPayload;

  const userData = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    decoded.email,
  ]);

  if (userData.rows.length === 0) {
    throw new Error("User Not Found");
  }

  const user = userData.rows[0];

  const JwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    email: user.email,
  };

  // NEW ACCESS TOKEN
  const accessToken = jwt.sign(JwtPayload, config.JWT_TOKEN as string, {
    expiresIn: "1d",
  });

  return {
    accessToken,
  };
};

export const AuthService = {
  signupUser,
  loginUser,
  generateRefreshToken,
};
