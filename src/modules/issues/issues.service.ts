import { pool } from "../../db/data";
import type { IIssue } from "./issue.interface";

const create = async (payload: IIssue, reporterId: number) => {
  const { title, description, type } = payload;
  const result = await pool.query(
    `
         INSERT INTO issues(
         title,description,type,reporter_id
         ) VALUES($1,$2,$3,$4) RETURNING *
        `,
    [title, description, type, reporterId],
  );
  return result;
};

const getAllIssues = async (query: any) => {
  const { sort, type, status } = query;
  let sql = `SELECT * FROM issues`;
  const values = [];

  // filter type
  if (type) {
    values.push(type);

    sql += ` WHERE type = $1`;
  }
  // filter status
  if (status) {
    values.push(status);

    if (type) {
      sql += ` AND status = $2`;
    } else {
      sql += ` WHERE status = $1`;
    }
  }
  // sorting
  if (sort === "oldest") {
    sql += ` ORDER BY created_at ASC`;
  } else {
    sql += ` ORDER BY created_at DESC`;
  }

  // get issues
  const result = await pool.query(sql, values);

  const issues = result.rows;
  // reporter add
  const finalData = [];

  for (const issue of issues) {
    const reporterResult = await pool.query(
      `
      SELECT id,name,role
      FROM users
      WHERE id = $1
      `,
      [issue.reporter_id],
    );

    finalData.push({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,

      reporter: reporterResult.rows[0],

      created_at: issue.created_at,
      updated_at: issue.updated_at,
    });
  }

  return finalData;
};

export const AuthIssuesService = {
  create,
  getAllIssues
};
