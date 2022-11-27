import React, { useState } from "react";
import { Post } from "types/post";

// MUI imports
import { IconButton } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import { useRouter } from "next/router";

const PostCard = ({ post }: any) => {
    const [posts, setPosts] = useState(post.posts)

    const navigate = useRouter();

    const goToBlogPost = (post: Post) => {
        navigate.push(`/posts/${post.slug}`)
    }

    return (

        <>

            <div className="flex flex-col gap-5 items-center">
                {posts.map((post: Post) => (
                    <div onClick={() => goToBlogPost(post)} className="rounded-xl border p-5 shadow-md w-[50%] bg-white cursor-pointer">
                        <div className="flex w-full items-center justify-between border-b pb-3">
                            <div className="flex items-center space-x-3">
                                <h1 className="text-md font-bold text-slate-700">{post.author}</h1>
                            </div>
                        </div>

                        <div className="mt-4 mb-6">
                            <h1 className="mb-3 text-xl font-bold">{post.title}</h1>
                            <p className="text-sm text-neutral-600 break-words ">{post.about}</p>
                        </div>
                    </div>
                ))}
            </div>




        </>



    )
}

export default PostCard;