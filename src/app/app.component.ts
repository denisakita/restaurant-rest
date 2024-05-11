import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MenuOverviewComponent} from "./components";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MenuOverviewComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'restaurant-rest';
}
