import { Component, OnInit } from '@angular/core';

import { AppService } from '../service/app.service';
import { ApiService } from 'src/shared';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItems: any;
  constructor(public appService: AppService, public apiService: ApiService) {}

  ionViewWillEnter() {
    this.cartItems = this.appService.getCartItems();

    this.apiService.currentAction.subscribe((resp) => {
      if (resp.action === 'cart_updated') {
        this.cartItems = this.appService.getCartItems();
      }
    });
  }
}
