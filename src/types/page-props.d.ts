import { UserSession } from "./user";

export type PageProps = {
    isAuthorized: boolean,
    userSession?: UserSession;
}