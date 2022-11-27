import { Post } from "./post";
import { UserSession } from "./user";

export type PageProps = {
    isAuthorized: boolean,
    userSession?: UserSession;
    post: Post
}