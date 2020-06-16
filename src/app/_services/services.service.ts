import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, } from 'rxjs';
import { AuthService } from '../_authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private _HttpClient: HttpClient, private authSer: AuthService) { }




  /////////////////////////////////////////////////////////////////////////////////////////////

  getAllServicesCat(): Observable<any> {
    return this._HttpClient.get(`${environment.apiUrl}/api/categories/${this.authSer.currentUserValue['data']['id']}/service`);

  }
  ////////////////////////////////////////////////////////////////////////////////////////////

  getAllServices(id): Observable<any> {
    // console.log(this.authSer.currentUserValue['data']['api_token']);

    return this._HttpClient.get(`${environment.apiUrl}/api/services/${this.authSer.currentUserValue['data']['id']}/${id}`);
  }


  /////////////////////////////////////////////////////////////////////////////////////////

  deleteService(index): Observable<any> {
    // console.log(this.authSer.currentUserValue['data']['api_token']);

    return this._HttpClient.delete(`${environment.apiUrl}/api/services/${this.authSer.currentUserValue['data']['id']}/${index}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authSer.currentUserValue['data']['api_token']}`,
      })
    });

  }

  /////////////////////////////////////////////////////////////////////////////////////////



  editService(index, s_fd): Observable<any> {

    return this._HttpClient.post(`${environment.apiUrl}/api/services/${this.authSer.currentUserValue['data']['id']}/${index}`,
      s_fd, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authSer.currentUserValue['data']['api_token']}`,
      })
    });


  }


  /////////////////////////////////////////////////////////////////////////////////////////


  addNewService(new_sfd): Observable<any> {
    return this._HttpClient.post(`${environment.apiUrl}/api/services/${this.authSer.currentUserValue['data']['id']} `,
      new_sfd, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authSer.currentUserValue['data']['api_token']}`,
      })

    });
  }




}
