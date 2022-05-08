import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Job } from 'src/app/_models/job';
import { smeProfile } from 'src/app/_models/smeProfile';
import { AccountsService } from 'src/app/_services/accounts.service';
import { SharedService } from 'src/app/_services/shared.service';
import { SmeService } from 'src/app/_services/sme.service';
import { DialogBidComponent } from '../dialog-bid/dialog-bid.component';

@Component({
  selector: 'app-sme-profile',
  templateUrl: './sme-profile.component.html',
  styleUrls: ['./sme-profile.component.css']
})
export class SmeProfileComponent implements OnInit {
  meetForm : FormGroup;
  smeProfile : smeProfile;
  smeSocialLink : any;
  filePath : any;
  model: any;
  jobData : Job;
  public message: string;
  public progress: number;
  username = '';
  formJob: FormGroup;

  constructor(private dialogRef : MatDialogRef<SmeProfileComponent>,@Inject(MAT_DIALOG_DATA) public smeData:any,private sharedService : SharedService,
  private smeService : SmeService, private toastr : ToastrService,private accountService : AccountsService,private fb : FormBuilder,
  private dialog : MatDialog, private router : Router) { }

  ngOnInit(): void {
   // console.log(this.smeData);
   this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
     this.username = user.username;
   })
    this.getSmeById(this.smeData.smeId);
    this.getJobById(this.smeData.jobId);
    this.initialiseForm();
    this.initializeFormJob();
  }

  getSmeById(id:any){
    this.smeService.getSmeById(id).subscribe(response =>{
      //console.log(response);
      this.smeProfile = response;
      if(response.socialLink !=null){
        this.smeSocialLink = response.socialLink;
        console.log(this.smeSocialLink);
      }
    })
  }

  getJobById(id : any){
    this.sharedService.getJobById(id).subscribe(response =>{
      console.log(response);
      this.jobData = response;      
      this.filePath = response.filePath;
      this.initializeFormJob();
     // console.log(this.filePath);
    })
  }

  download() {
    if(this.filePath !=null){
      this.sharedService.download(this.filePath).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round((100 * event.loaded) / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Download success.';
          this.downloadFile(event);
        }
      });
    }else{
      this.toastr.error();
    }
    
  }

  private downloadFile(data: HttpResponse<Blob>) {
    const downloadedFile = new Blob([data.body], { type: data.body.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = this.filePath;
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }

  createImgPath(serverPath : string){
    return `https://localhost:5001/${serverPath}`;
  }

  initialiseForm(){
    this.meetForm = new FormGroup({
      meetTitle : new FormControl(),
      meetingDetails : new FormControl(),
      startDate : new FormControl(),
      endDate : new FormControl()
    })
  }

  meetingModel(){
    this.model ={
      'username' : this.username?.toLowerCase(),
      'meetTitle' : this.meetForm.controls['meetTitle'].value,
      'meetingDetails' : this.meetForm.controls['meetingDetails'].value,
      'startDate' : this.meetForm.controls['startDate'].value,
      'endDate' : this.meetForm.controls['endDate'].value,      
      'smeId' : this.smeData?.smeId      
    }
  }

  scheduleMeeting(){
    this.meetingModel();
    if(this.model !=null){
      this.sharedService.scheduleMeeting(this.model).subscribe(response =>{
        console.log(response);
        this.toastr.success("Meeting Scheduled");

      },error =>{
        this.toastr.error(error.error);
      })
    }
  }

  initializeFormJob(){
    this.formJob = this.fb.group({
      id: [this.jobData?.id],
      jobTitle:[this.jobData?.jobTitle],
      desc: [this.jobData?.desc],
      timeFrame :[this.jobData?.timeframe],
      budget:[this.jobData?.budget]

    })
  }

  openDialog(row :any){
    const diag = this.dialog.open(DialogBidComponent,{
      data : row
    })
  }

  goToBid(){
    this.router.navigateByUrl("Bid/sendBid");
    this.dialogRef.close();
  }

}
