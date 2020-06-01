import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _httpClient: HttpClient) { }

  getCategories(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/api/categories/1`);

  }


}
