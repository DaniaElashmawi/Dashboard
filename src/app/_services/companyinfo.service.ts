import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  ///////////////////////////////////////////////////////////////////////////////////////////////

  editProfile(profile_fd, id): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/company_infs/${this._authSer.currentUserValue['data']['id']}/${id} `,
      profile_fd, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${this._authSer.currentUserValue['data']['api_token']}`,
      })

    });
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  deleteProfile(id): Observable<any> {
    return this._httpClient.delete(`${environment.apiUrl}/api/company_infs/${this._authSer.currentUserValue['data']['id']}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._authSer.currentUserValue['data']['api_token']}`,
      })
    });

  }


}
