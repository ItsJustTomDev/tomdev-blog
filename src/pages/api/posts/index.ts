import query from "lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { secureAPI } from "auth/secure-api";
import { Query } from "types/query";
import { Post } from "types/post";
import { newPostValidationScheme } from "../../../pages/posts/new";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST")
        secureAPI(createPost)(req, res);

    if (req.method === "GET")
        await getPosts(req, res);

}

const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
    const validatedResult = await newPostValidationScheme.validate(req.body);

    if (!validatedResult)
        return res.status(400).send({ success: false, message: "Invalid data" });

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

const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
    const { slug } = req.query;

    const resPosts = await query({
        query: "SELECT * FROM posts WHERE slug = ?",
        values: [slug as string]
    }) as Post[];

    if (resPosts.length <= 0) {
        const allPosts = await query({
            query: "SELECT * FROM posts",
            values: []
        }) as Post[];

        if (!allPosts)
            return res.status(500).json({ success: false, message: "Internal server error" });

        return res.status(200).json({ success: true, posts: allPosts });
    }

    return res.status(200).json({ success: true, data: resPosts[0] });
}

export default handler; 