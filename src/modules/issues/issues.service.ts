import { pool } from "../../db/data";
import type { IIssue } from "./issue.interface"


const create =async(payload:IIssue, reporterId: number)=>{
    const {title,description,type}=payload;
    const result =await pool.query(`
         INSERT INTO issues(
         title,description,type,reporter_id
         ) VALUES($1,$2,$3,$4) RETURNING *
        `,[title,description,type,reporterId])
    return result
}

export const AuthIssuesService ={
    create
}