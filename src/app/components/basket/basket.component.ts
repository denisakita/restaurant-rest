import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatDrawer} from "@angular/material/sidenav";
import {RestaurantService} from "../../services";

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit, OnChanges {
  @Input() basketItems: any[] = [];
  calculatedTotal = {total: 0};
  deliveryFee: number = 3.00;
  dishesItems: any[] = [];
  @Input() sidenavIsOpen!: boolean;
  @Output() closeSidenav: EventEmitter<void> = new EventEmitter<void>();
  @Output() checkOut: EventEmitter<void> = new EventEmitter<void>();
  showCheckout: boolean=false;


  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.getBasket();
    this.calculatedTotal = this.restaurantService.getCalculatedTotal();
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.dishesItems = this.basketItems;

  }

  getBasket(): void {
    this.dishesItems = this.basketItems;
  }


  decreaseQuantity(item: any): void {
    this.restaurantService.decreaseQuantity(item);
    if (this.basketItems.length === 0) {
      this.closeBasket();
    }
  }

  increaseQuantity(item: any): void {
    this.restaurantService.increaseQuantity(item);

  }

  closeBasket(): void {
    this.closeSidenav.emit();
  }

  toggleCheckout() {
    this.showCheckout = !this.showCheckout;
  }
}
