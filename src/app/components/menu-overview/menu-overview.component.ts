import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {RestaurantService} from "../../services";
import {CommonModule} from "@angular/common";
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {BasketComponent} from "../basket/basket.component";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-menu-overview',
  standalone: true,
  imports: [CommonModule, BasketComponent, MatSidenavModule, MatIcon,],
  templateUrl: './menu-overview.component.html',
  styleUrl: './menu-overview.component.css'
})
export class MenuOverviewComponent implements OnInit {
  dishes: any[] = [];
  selectedTag: string = '';
  filteredDishes: any[] = [];
  basketItems: any[] = [];
  sidenavIsOpen = false;

  @ViewChild('drawer') drawer!: MatDrawer;
  @Output() basketItemsChanged: EventEmitter<any[]> = new EventEmitter<any[]>();

  // quantityMenu: any;

  constructor(
    private restaurantService: RestaurantService) {
  }

  ngOnInit(): void {
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
    this.restaurantService.addToBasket(dish);
    this.toggleSideNav();
  }

  isAddedToBasket(dish: any): boolean {
    return this.restaurantService.isAddedToBasket(dish)
  }

  getQuantityInBasket(dish: any): number {
    return this.restaurantService.getQuantityInBasket(dish);
  }

  decreaseQuantity(dish: any): void {
    this.restaurantService.decreaseQuantity(dish);
  }

  increaseQuantity(dish: any): void {
    this.restaurantService.increaseQuantity(dish);
  }

  toggleSideNav() {
    if (this.sidenavIsOpen) {
      this.drawer.close().then(() => {
        this.sidenavIsOpen = false;
      });
    } else {
      this.drawer.open().then(() => {
        this.sidenavIsOpen = true;
      });
    }
  }

}
