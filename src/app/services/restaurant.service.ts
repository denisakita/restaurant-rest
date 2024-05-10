import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:3000';
  basketItems: any[] = [];

  constructor(private http: HttpClient) {
  }

  getDishes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dishes`);
  }

  getDishById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dishes/${id}`);
  }

  getBasket(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/basket`);
  }

}
