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

  /**
   * Retrieves all dishes available in the restaurant.
   * @returns An Observable containing an array of dishes.
   */
  getDishes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dishes`);
  }

  /**
   * Retrieves a specific dish by its ID.
   * @param id The ID of the dish to retrieve.
   * @returns An Observable containing the dish details.
   */
  getDishById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dishes/${id}`);
  }

  /**
   * Retrieves the current contents of the user's shopping basket.
   * @returns An Observable containing an array of items in the basket.
   */
  getBasket(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/basket`);
  }

  /**
   * Removes an item from the basket.
   * @param itemIndex The index of the item to remove from the basket.
   */
  removeFromBasket(itemIndex: number): void {
    this.basketItems.splice(itemIndex, 1);
  }

  /**
   * Adds a dish to the basket.
   * If the dish is already in the basket, increments its quantity.
   * If not, adds the dish to the basket with a quantity of 1.
   * @param dish The dish to add to the basket.
   */
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

  /**
   * Checks if a dish is already added to the basket.
   * @param dish The dish to check.
   * @returns True if the dish is in the basket, otherwise false.
   */
  isAddedToBasket(dish: any): boolean {
    return this.basketItems.some(item => item.id === dish.id);
  }

  /**
   * Retrieves the quantity of a dish in the basket.
   * @param dish The dish to get the quantity for.
   * @returns The quantity of the dish in the basket.
   */
  getQuantityInBasket(dish: any): number {
    const item = this.basketItems.find(item => item.id === dish.id);
    return item ? item.quantity : 0;

  }

  /**
   * Decreases the quantity of a dish in the basket by 1.
   * If the quantity becomes zero, removes the dish from the basket.
   * @param dish The dish to decrease the quantity for.
   */
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

  /**
   * Increases the quantity of a dish in the basket by 1.
   * @param dish The dish to increase the quantity for.
   */
  increaseQuantity(dish: any): void {
    const itemIndex = this.basketItems.findIndex(item => item.id === dish.id);
    if (itemIndex !== -1) {
      this.basketItems[itemIndex].quantity++;
    }
    this.getCalculatedTotal();
  }

  /**
   * Calculates the total price of all items in the basket.
   * @returns The total price of all items in the basket.
   */
  calculateTotal() {
    return this.basketItems.reduce((acc, item) => acc + item.price * (item.quantity), 0);
  }

  /**
   * Updates the calculated total price of all items in the basket.
   * @returns The updated calculated total.
   */
  getCalculatedTotal() {
    this.calculatedTotal.total = this.calculateTotal();
    return this.calculatedTotal;
  }

}
