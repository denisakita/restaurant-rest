import {BasketComponent} from "./basket/basket.component";
import {MenuOverviewComponent} from "./menu-overview/menu-overview.component";
import {CheckoutComponent} from "./checkout/checkout.component";

export const components: any[] = [
  BasketComponent, CheckoutComponent, MenuOverviewComponent
]

export * from './basket/basket.component';
export * from './checkout/checkout.component';
export * from './menu-overview/menu-overview.component';
