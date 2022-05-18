import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { SharedService } from 'src/app/_services/shared.service';
@Component({
  selector: 'app-test-upload',
  templateUrl: './test-upload.component.html',
  styleUrls: ['./test-upload.component.css']
})
export class TestUploadComponent implements OnInit {
  public progress: number;
  public message: string;

  fileUrl : string;

  testData : any =[];
  fileToUpload : File;


  @Output() public onUploadFinished = new EventEmitter();
  constructor(private http:  HttpClient, private sharedService : SharedService) { }

  ngOnInit(): void {
    this.fileUrl = 'https://localhost:5001/_files/Ass1.pdf';
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    
    this.fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    
    this.http.post('https://localhost:5001/api/FileManager/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }


  getFile(){

    this.http.get<any>('https://localhost:5001/api/FileManager/getImg/2').subscribe(response =>{
      this.testData = response;
      console.log(this.testData);
    })

    
  }

  downloadFile3()
  {
    return this.http.get(`http://localhost:5001/FileManager/download/4`, {responseType: 'blob'})
    .subscribe((result: Blob) => {
      const blob = new Blob([result]); // you can change the type
      const url= window.URL.createObjectURL(blob);
      window.open(url);
      console.log("Success");
  });
  }

  download() {
    this.sharedService.download(this.fileUrl).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round((100 * event.loaded) / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Download success.';
        this.downloadFile(event);
      }
    });
  }


  private downloadFile(data: HttpResponse<Blob>) {
    const downloadedFile = new Blob([data.body], { type: data.body.type });
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = this.fileUrl;
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  }



}
