import { timeline } from '../_models/timeline';
export interface bidProfCard {
    bidId: string;
    bidAmount : string;
    bidResponse : string;
    bidDesc : string;
    bidDate : Date;
    bidOtherDetails :string;
    bidNotes : string;
    bidScore :string;
    profId: string;
    jobId : string;
    jobTitle : string;
    jobDescription: string;    
    smeId : string;    
    profName : string;
    profDesc : string;
    profAppId: string;
    profPic: string;
    timeline : timeline[];

}