import React from "react";

// MUI imports
import { IconButton } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const PostCard = () => {

    return (
        <div className='flex items-center justify-center'>
            <div className="rounded-xl border p-5 shadow-md w-9/12 bg-white">
                <div className="flex w-full items-center justify-between border-b pb-3">
                    <div className="flex items-center space-x-3">
                        <h1 className="text-md font-bold text-slate-700">@TomDev</h1>
                    </div>
                    <p className="text-xs text-neutral-500">2 hours ago</p>
                </div>

                <div className="mt-4 mb-6">
                    <h1 className="mb-3 text-xl font-bold">Nulla sed leo tempus, feugiat velit vel, rhoncus neque?</h1>
                    <p className="text-sm text-neutral-600">Aliquam a tristique sapien, nec bibendum urna. Maecenas convallis dignissim turpis, non suscipit mauris interdum at. Morbi sed gravida nisl, a pharetra nulla. Etiam tincidunt turpis leo, ut mollis ipsum consectetur quis. Etiam faucibus est risus, ac condimentum mauris consequat nec. Curabitur eget feugiat massa</p>
                </div>

                <div>
                    <div className="flex items-center justify-between text-slate-500">
                        <div className="flex space-x-4 md:space-x-8">
                            <div className="flex cursor-pointer items-center">
                                <IconButton>
                                    <ThumbUpIcon />
                                </IconButton>
                                <span>125</span>
                            </div>
                            <div className="flex cursor-pointer items-center">
                                <IconButton>
                                    <ThumbDownIcon />
                                </IconButton>
                                <span>4</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard;