import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }


  listarRoles() {
    return this.http.get(`${base_url}/roles`);
  }
}