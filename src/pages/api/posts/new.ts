import { NextApiRequest, NextApiResponse } from "next";
import { secureAPI } from "authorization/secureAPI";
import { newPostValidationScheme } from "schema/NewPostSchema";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const validatedResult = await newPostValidationScheme.validate(req.body);
  if (!validatedResult) return res.status(400).send({ success: false, message: "Invalid data" });
}

export default secureAPI(handler);