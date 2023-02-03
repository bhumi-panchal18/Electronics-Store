import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { applianceModel } from '../Modal/applianceModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiUrl:string = 'http://localhost:3000/appliances';

  getAllAppliances(): Observable<applianceModel[]> {
    return this.http.get<applianceModel[]>(this.apiUrl);
  }

  getAppliancebyid(id:any): Observable<applianceModel> {
    return this.http.get<applianceModel>(this.apiUrl+'/'+id);
  }

  removeAppliancebyid(id:any){
    return this.http.delete(this.apiUrl+'/'+id);
  }

  createAppliance(appliancedata: applianceModel) {
    return this.http.post(this.apiUrl, appliancedata);
  }

  updateAppliancebyid(id:any, applianceData: any){
    return this.http.put(this.apiUrl+'/'+id,applianceData);
  }

}
