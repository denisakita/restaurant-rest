import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "../../services";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-menu-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-overview.component.html',
  styleUrl: './menu-overview.component.css'
})
export class MenuOverviewComponent implements OnInit {
  dishes: any[] = [];
  selectedTag: string = '';
  filteredDishes: any[] = [];
  basketItems: any[] = [];


  constructor(private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    this.basketItems = this.restaurantService.basketItems;
    this.getMenu();
  }

  getMenu(): void {
    this.restaurantService.getDishes().subscribe(dishes => {
      this.dishes = dishes;
      this.filteredDishes = this.dishes;
    });
  }

  filterByTag(tag: string) {
    this.selectedTag = tag;

    if (this.selectedTag === 'Popular') {
      this.filteredDishes = [...this.dishes];
    } else {
      this.filteredDishes = this.dishes.filter(dish => dish.category === tag);
    }
  }

  addToBasket(dish: any): void {

  }

  isAddedToBasket(dish: any): boolean {
    return false
  }

  getQuantityInBasket(dish: any): number {
    return 0;
  }

  decreaseQuantity(dish: any): void {

  }

  increaseQuantity(dish: any): void {

  }
}
