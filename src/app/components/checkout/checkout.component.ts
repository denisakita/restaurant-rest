import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup = new FormGroup({});
  @Output() closeSidenav = new EventEmitter<unknown>();

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      confirmOrder: [false]
    });
  }

  submitForm() {
    if (this.checkoutForm.valid) {
      console.log('Form submitted successfully!');
      this.showSnackBar('Order placed successfully!');
    } else {
      this.checkoutForm.markAllAsTouched();
      this.showSnackBar('Please fill in all required fields.');
    }
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  closeBasket(): void {
    this.closeSidenav.emit();
  }
}
