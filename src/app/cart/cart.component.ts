import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppService } from '../service/app.service';
import { ApiService, AlertService } from 'src/shared';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItems: any;
  sub!: Subscription;
  constructor(
    public appService: AppService,
    public apiService: ApiService,
    public alertService: AlertService
  ) {}

  ionViewWillEnter() {
    this.cartItems = this.appService.getCartItems();

    this.sub = this.apiService.currentAction.subscribe((resp) => {
      if (resp.action === 'cart_updated') {
        this.cartItems = this.appService.getCartItems();
      }
    });
  }

  checkout() {
    this.alertService.presentAlert(
      'notifying',
      'successful order placement!',
      () => {
        this.yesHandler();
      },
      null,
      'ok'
    );
  }

  yesHandler() {
    this.appService.emptyCart();
  }

  ionViewWillLeave() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
