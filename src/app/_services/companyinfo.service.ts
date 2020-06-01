import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyinfoService {

  constructor(private _httpClient: HttpClient) { }

  getCompanyInfo(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/api/company_infs/1/1`);

  }

}
