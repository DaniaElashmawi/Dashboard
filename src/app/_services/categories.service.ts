import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, } from 'rxjs';
import { AuthService } from '../_authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _httpClient: HttpClient, private _authSer: AuthService) { }


  addNewCategory(new_cfd): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/categories/${this._authSer.currentUserValue['data']['id']} `,
      new_cfd, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${this._authSer.currentUserValue['data']['api_token']}`,
      })

    });
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////
  editCategory(index, edit_cfd): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/categories/${this._authSer.currentUserValue['data']['id']}/${index} `,
      edit_cfd, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${this._authSer.currentUserValue['data']['api_token']}`,
      })

    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  getServicesCat(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/api/categories/${this._authSer.currentUserValue['data']['id']}/service `);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  getProjectsCat(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/api/categories/${this._authSer.currentUserValue['data']['id']}/project `);
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  deleteCAT(index): Observable<any> {
    return this._httpClient.delete(`${environment.apiUrl}/api/categories/${this._authSer.currentUserValue['data']['id']}/${index}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._authSer.currentUserValue['data']['api_token']}`,
      })
    });
  }



}
