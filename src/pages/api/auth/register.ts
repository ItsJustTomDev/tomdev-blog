import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcrypt"
import query from 'lib/db';
import { UserType } from 'types/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(422).json({ success: false, message: "Please enter all fields" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: "Passwords do not match" });
  }

  try {
    // Check if user exists
    const existingUser = await query({
      query: "SELECT * FROM users WHERE email = ?",
      values: [email]
    }) as UserType[];

    if (existingUser.length > 0) {
      return res.status(403).json({ success: false, message: "User already exists" });
    }

    const salt = bcrypt.genSaltSync(256);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await query({
      query: "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      values: [name, email, hashedPassword]
    });

    return res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
