import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersService } from './../customers/customer-list/customers.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  purchases: any[] = [];

  constructor(private customersService: CustomersService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customersService.getPurchasedPolicies().subscribe({
      next: data => this.purchases = data,
      error: err => console.error(err)
    });
  }
}
