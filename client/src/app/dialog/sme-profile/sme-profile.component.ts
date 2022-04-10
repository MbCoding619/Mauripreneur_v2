import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { smeProfile } from 'src/app/_models/smeProfile';
import { SharedService } from 'src/app/_services/shared.service';
import { SmeService } from 'src/app/_services/sme.service';

@Component({
  selector: 'app-sme-profile',
  templateUrl: './sme-profile.component.html',
  styleUrls: ['./sme-profile.component.css']
})
export class SmeProfileComponent implements OnInit {

  smeProfile : smeProfile;
  smeSocialLink : any;
  filePath : any;
  public message: string;
  public progress: number;

  constructor(private dialogRef : MatDialogRef<SmeProfileComponent>,@Inject(MAT_DIALOG_DATA) public smeData:any,private sharedService : SharedService,
  private smeService : SmeService, private toastr : ToastrService) { }

  ngOnInit(): void {
   // console.log(this.smeData);
    this.getSmeById(this.smeData.smeId);
    this.getJobById(this.smeData.id);
  }

  getSmeById(id:any){
    this.smeService.getSmeById(id).subscribe(response =>{
      console.log(response);
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
      this.filePath = response.filePath;
      console.log(this.filePath);
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
}
