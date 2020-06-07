import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyinfoService {

  constructor(private _httpClient: HttpClient, private _authSer: AuthService) { }

  getCompanyInfo(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/api/company_infs/${this._authSer.currentUserValue['data']['id']}`);

  }

}
