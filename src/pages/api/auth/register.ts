import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcrypt"
import query from 'lib/db';
import { UserType } from 'types/User';
import { registerValidationScheme } from 'schema/LoginSchema';
import { InsertQueryType } from 'types/Query';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const validatedResult = await registerValidationScheme.validate(req.body);
  if (!validatedResult) return res.status(400).send({ success: false, message: "Invalid data" });

  if (req.method !== "POST") return res.status(405).json({ success: false, message: "Method not allowed" });

  const existingUser = await query({ query: "SELECT * FROM users WHERE email = ?", values: [validatedResult.email] }) as UserType[];
  if (existingUser.length > 0) return res.status(403).json({ success: false, message: "User already exists" });

  const hashedPassword = bcrypt.hashSync(validatedResult.password, bcrypt.genSaltSync(256));
  const inputNewUser = await query({
    query: "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    values: [validatedResult.name, validatedResult.email, hashedPassword]
  }) as InsertQueryType;

  if (inputNewUser.affectedRows === 1) return res.status(201).json({ success: true, message: "User created" });
  return res.status(500).json({ success: false, message: "Internal server error" });
}
