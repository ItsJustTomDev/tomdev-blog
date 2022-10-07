import query from "lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { secureAPI } from "auth/secure-api";
import { Query } from "types/query";
import { Post } from "types/post";
import { newPostValidationScheme } from "@components/ui/new-post";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const validatedResult = await newPostValidationScheme.validate(req.body);

    if (!validatedResult)
        return res.status(400).send({ success: false, message: "Invalid data" });

    if (req.method !== "POST")
        return res.status(405).json({ success: false, message: "Method not allowed" });

    let slug = validatedResult.title.toLowerCase().replace(/ /g, "-");

    const existingSlug = await query({
        query: "SELECT * FROM posts WHERE slug = ?",
        values: [slug]
    }) as Post[]

    if (existingSlug.length > 0) {
        const randomString = Math.random().toString(36).substring(2, 15);
        slug = slug + "-" + randomString;
    }

    const insertPost = await query({
        query: "INSERT INTO posts (title, about, content, author, slug) VALUES (?, ?, ?, ?, ?)",
        values: [validatedResult.title, validatedResult.about, validatedResult.content, validatedResult.author, slug]
    }) as Query;

    if (insertPost.affectedRows !== 1)
        return res.status(500).json({ success: false, message: "Internal server error" });

    return res.status(201).json({ success: true, message: "Post created" });
}

export default secureAPI(handler); 