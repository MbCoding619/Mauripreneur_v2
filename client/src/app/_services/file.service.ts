import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  
  
  baseUrl =  environment.apiUrl;

  constructor(private http: HttpClient) { }


  //testing

  public download(fileUrl: string) {
    return this.http.get(`${this.baseUrl}/FileManager/download?fileUrl=${fileUrl}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    });
  }

  public upload(formData: FormData,id : any) {
    return this.http.post(`${this.baseUrl}FileManager/upload/${id}`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
