import { Injectable } from '@angular/core';

import { ApiService } from 'src/shared';
import { CONFIG } from 'src/shared/services/config';

@Injectable()
export class AppService {
  courseData = [];
  cartItems: Record<string, any> = {};
  wishLists: Record<string, any> = {};
  constructor(public apiService: ApiService) {}

  get(url: string) {
    return new Promise((resolve, reject) => {
      this.apiService.getApi(url, null).then(
        (resp: any) => {
          resolve(resp);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  }

  getCourseData() {
    return new Promise((resolve, reject) => {
      this.get(CONFIG.endpoints.getCourseData).then(
        (resp: any) => {
          this.courseData = resp;
          resolve(resp);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  updateCart(course: any, action: string) {
    if (action == 'add') {
      if (this.cartItems[course.courseName]) return;
      this.cartItems[course.courseName] = course;
    } else {
      delete this.cartItems[course.courseName];
    }

    console.log('cart item', this.cartItems);
    this.apiService.sendAction({ action: 'cart_updated' });
  }

  updateWishlist(course: any, action: string) {
    if (action == 'add') {
      if (this.wishLists[course.courseName]) return;
      this.wishLists[course.courseName] = course;
    } else {
      delete this.wishLists[course.courseName];
    }

    console.log('wishlist item', this.wishLists);
    this.apiService.sendAction({ action: 'wishlist_updated' });
  }

  getCartItems() {
    return Object.values(this.cartItems);
  }

  getWishlist() {
    return Object.values(this.wishLists);
  }
}
