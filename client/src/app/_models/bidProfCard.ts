import { timeline } from '../_models/timeline';
export interface bidProfCard {
    bidId: number;
    bidAmount : number;
    profId: number;
    jobId : number;
    jobTitle : string;
    jobDescription: string;    
    smeId : number;    
    profName : string;
    profDesc : string;
    profAppId: number;
    profPic: number;
    timeline : timeline[];

}