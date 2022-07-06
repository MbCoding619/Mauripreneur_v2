import{ Bid } from '../_models/Bid';
export interface Job{

    id: string;
    jobTitle : string;
    desc :string;
    requirements: string;
    timeframe: string;
    fieldId: string;
    filePath : string;
    budget:string;
    smeId : string;
    compName : string;
    jobStatus : string;
    bid : Bid[];

}