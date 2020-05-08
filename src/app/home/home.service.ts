import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Response } from './../shared/models/response';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getCartList(): Observable<Response> {
     return this.http.get<Response>(`./assets/mock/cart.json`);
  }
}
