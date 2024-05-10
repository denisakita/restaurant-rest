import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:3000';
  basketItems: any[] = [];
  calculatedTotal: any = {total: 0};

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

  removeFromBasket(itemIndex: number): void {
    this.basketItems.splice(itemIndex, 1);
  }


  addToBasket(dish: any): void {
    const existingItemIndex = this.basketItems.findIndex(item => item.id === dish.id);
    if (existingItemIndex !== -1) {
      this.basketItems[existingItemIndex].quantity++;
    } else {
      const newItem = {...dish, quantity: 1};
      this.basketItems.push(newItem);
    }
    this.getCalculatedTotal();

  }


  isAddedToBasket(dish: any): boolean {
    return this.basketItems.some(item => item.id === dish.id);
  }

  getQuantityInBasket(dish: any): number {
    const item = this.basketItems.find(item => item.id === dish.id);
    return item ? item.quantity : 0;

  }


  decreaseQuantity(dish: any): void {
    const itemIndex = this.basketItems.findIndex(item => item.id === dish.id);
    if (itemIndex !== -1 && this.basketItems[itemIndex].quantity >= 1) {
      this.basketItems[itemIndex].quantity--;
      if (this.basketItems[itemIndex].quantity <= 0) {
        this.removeFromBasket(itemIndex);
      }
    }
    this.getCalculatedTotal();
  }

  increaseQuantity(dish: any): void {
    const itemIndex = this.basketItems.findIndex(item => item.id === dish.id);
    if (itemIndex !== -1) {
      this.basketItems[itemIndex].quantity++;
    }
    this.getCalculatedTotal();
  }

  calculateTotal() {
    return this.basketItems.reduce((acc, item) => acc + item.price * (item.quantity), 0);
  }

  getCalculatedTotal() {
    this.calculatedTotal.total = this.calculateTotal();
    return this.calculatedTotal;
  }

}
