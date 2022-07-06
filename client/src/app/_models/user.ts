import { Professional } from "./professional";

export interface User{
    username:string;
    userName : string;
    token: string;
    appUserRole: string;
    appUserId : number;
    imagePath: string;
    professional : Professional
}