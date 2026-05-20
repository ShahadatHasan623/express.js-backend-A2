import { pool } from "../db/data";
import type { IUser } from "./auth.interface";
import bcrypt from "bcrypt";

const signupUser = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const hasPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,COALESCE($4,'contributor')) RETURNING *`,
    [name, email, hasPassword, role],
  );
  return result;
};

export const AuthService = {
  signupUser,
};
