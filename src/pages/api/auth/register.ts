import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcrypt"
import query from 'lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(422).json({ success: false, message: "Please enter all fields" });
  }

  try {
    // Check if user exists
    const existingUser = await query({
      query: "SELECT * FROM users WHERE email = ?",
      values: [email]
    }) as Array<Object>;

    console.log(existingUser);

    if (existingUser.length > 0) {
      return res.status(403).json({ success: false, message: "User already exists" });
    }

    const salt = bcrypt.genSaltSync(256);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const confirmedPassword = bcrypt.hashSync(confirmPassword, salt);

    await query({
      query: "INSERT INTO users (name, email, password, confirmPassword) VALUES (?, ?, ?, ?)",
      values: [name, email, hashedPassword, confirmedPassword]
    });

    return res.status(200).json({ success: true, message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
