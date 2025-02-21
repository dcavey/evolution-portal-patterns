import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = [
    { name: 'Product 1', price: '$99.99' },
    { name: 'Product 2', price: '$149.99' }
  ];

  ngOnInit() {
    // Fetch products data if needed
  }

  addToCart(productName: string) {
    console.log(`Adding ${productName} to cart`);
    const cartMessage = document.getElementById('cart-message');
    if (cartMessage) {
      cartMessage.textContent = `${productName} has been added to your cart.`;
      cartMessage.style.display = 'block';
      setTimeout(() => {
        cartMessage.style.display = 'none';
      }, 3000);
    }
  }
}
