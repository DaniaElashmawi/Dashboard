import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private _HttpClient: HttpClient) { }


  getAllProjects(): Observable<any> {
    return this._HttpClient.get(`${environment.apiUrl}/api/unknown/`);
  }

  getSingleProject(id): Observable<any> {
    return this._HttpClient.get(`${environment.apiUrl}/api/unknown/${id}`);
  }

}
