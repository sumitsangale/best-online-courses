import { Component, OnInit } from '@angular/core';

import { AppService } from '../service/app.service';
import { ApiService } from 'src/shared';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishLists: any;
  constructor(public appService: AppService, public apiService: ApiService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.wishLists = this.appService.getWishlist();

    this.apiService.currentAction.subscribe((resp) => {
      if (resp.action === 'wishlist_updated') {
        this.wishLists = this.appService.getWishlist();
      }
    });
  }
}
