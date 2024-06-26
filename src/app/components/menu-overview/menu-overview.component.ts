import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {RestaurantService} from "../../services";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {BasketComponent} from "../basket/basket.component";
import {MatIcon} from "@angular/material/icon";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-menu-overview',
  standalone: true,
  imports: [CommonModule, BasketComponent, MatSidenavModule, MatIcon, ReactiveFormsModule, NgOptimizedImage,],
  templateUrl: './menu-overview.component.html',
  styleUrl: './menu-overview.component.css'
})
export class MenuOverviewComponent implements OnInit {
  dishes: any[] = [];
  selectedTag: string = '';
  filteredDishes: any[] = [];
  basketItems: any[] = [];
  sidenavIsOpen = false;
  searchForm: FormGroup = new FormGroup<any>({})

  @ViewChild('drawer') drawer!: MatDrawer;
  @Output() basketItemsChanged: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.basketItems = this.restaurantService.basketItems;
    this.getMenu();
    this.getSearchForm();

  }

  getSearchForm() {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }


  searchMenuItem(): void {
    const searchTerm = this.searchForm.get('search')?.value.trim().toLowerCase();
    this.filteredDishes = this.dishes.filter(dish => dish.name.toLowerCase().includes(searchTerm));
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
    if (this.basketItems.length === 0) {
      this.sidenavIsOpen = false;
    }
  }

  increaseQuantity(dish: any): void {
    this.restaurantService.increaseQuantity(dish);
  }

  toggleSideNav() {
    if (!this.sidenavIsOpen) {
      this.drawer.open().then(() => {
        this.sidenavIsOpen = true;
      });
    }
  }

}
