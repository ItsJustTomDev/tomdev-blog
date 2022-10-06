import mysql from "serverless-mysql";

const db = mysql({
  config: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  }
});

type QueryType = {
  query: string;
  values: string[];
}

export default async function query({ query, values }: QueryType) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results
  } catch (error) {
    return { error }
  }
}