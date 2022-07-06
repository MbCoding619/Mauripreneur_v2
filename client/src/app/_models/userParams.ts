import { User } from "./user";

export class UserParams {
    appUserRole : string;
    pageNumber =1;
    pageSize = 5;
    fieldId :string;

    constructor(user : User){
        this.appUserRole = user.appUserRole === 'SME' ? 'PROFESSIONAL' : 'SME';
    }
}