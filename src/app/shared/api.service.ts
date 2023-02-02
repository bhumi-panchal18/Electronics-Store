import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { applianceData } from '../Modal/applianceModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiUrl:string = 'http://localhost:3000/appliances';

  getAllAppliances(): Observable<applianceData[]> {
    return this.http.get<applianceData[]>(this.apiUrl);
  }

  getAppliancebyid(id:any): Observable<applianceData> {
    return this.http.get<applianceData>(this.apiUrl+'/'+id);
  }

  removeAppliancebyid(id:any){
    return this.http.delete(this.apiUrl+'/'+id);
  }

  createAppliance(appliancedata: applianceData) {
    return this.http.post(this.apiUrl, appliancedata);
  }

  updateAppliancebyid(id:any, applianceData: any){
    return this.http.put(this.apiUrl+'/'+id,applianceData);
  }

}
