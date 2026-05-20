import { pool } from "../db/data";
import type { IUser } from "./auth.interface";
import bcrypt from "bcrypt";

const signupUser = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const hasPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *`,
    [name, email, hasPassword, role],
  );
  if (!name || !email || !password || !role) {
    throw new Error("All fields are required");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  if (role !== "contributor" && role !== "maintainer") {
    throw new Error("Role must be contributor or maintainer");
  }
  return result;
};

export const AuthService = {
  signupUser,
};
