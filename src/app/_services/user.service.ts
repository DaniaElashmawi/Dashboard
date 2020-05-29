import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _HttpClient: HttpClient) { }
  getUser(id): Observable<any> {
    return this._HttpClient.get(`${environment.apiUrl}/api/users/${id}`);

  }
}
