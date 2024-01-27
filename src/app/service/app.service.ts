import { Injectable } from '@angular/core';

import { ApiService, ToastService } from 'src/shared';
import { CONFIG } from 'src/shared/services/config';

@Injectable()
export class AppService {
  courseData = [];
  filterData = [];
  cartItems: Record<string, any> = {};
  wishLists: Record<string, any> = {};
  cartTotal: number = 0;
  cartSaving: number = 0;
  constructor(public apiService: ApiService, public toast: ToastService) {}

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
          this.filterData = resp;
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
    this.toast.showTop(
      `course ${
        action === 'add' ? 'added into' : 'removed from'
      } cart successfully!`,
      'success'
    );
    this.getCartTotal();
    this.getCartSaving();
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
    this.toast.showTop(
      `course ${
        action === 'add' ? 'added into' : 'removed from'
      } wishlist successfully!`,
      'success'
    );
  }

  retnum(str: string) {
    var num = str.replace(/[^0-9]/g, '');
    return parseInt(num, 10);
  }

  getCartItems() {
    return Object.values(this.cartItems);
  }

  getWishlist() {
    return Object.values(this.wishLists);
  }

  getCartTotal() {
    this.cartTotal = Object.values(this.cartItems).reduce((acc, cur) => {
      let price;
      let actualPrice;
      if (cur.discountPercentage) {
        actualPrice = this.retnum(cur.actualPrice);
        let discount = this.retnum(cur.discountPercentage);
        price = Math.ceil(actualPrice - (actualPrice * discount) / 100);
      } else {
        price = actualPrice;
      }

      return (acc += price);
    }, 0);
    return this.cartTotal;
  }

  getCartSaving() {
    let total = Object.values(this.cartItems).reduce((acc, cur) => {
      let actualPrice = this.retnum(cur.actualPrice);

      return (acc += actualPrice);
    }, 0);
    this.cartSaving = total - this.cartTotal;
    return this.cartSaving;
  }

  filterCourses(value: string) {
    if (!value) {
      this.filterData = this.courseData;
      return;
    }
    value.toLowerCase();
    this.filterData = this.courseData.filter((ele: any) => {
      let isPresent = ele.tags.some((tag: any) =>
        tag.toLowerCase().includes(value)
      );
      return (
        ele.courseName.toLowerCase().includes(value) ||
        ele.author.toLowerCase().includes(value) ||
        isPresent
      );
    });
  }

  emptyCart() {
    this.cartItems = {};
    this.apiService.sendAction({ action: 'cart_updated' });
  }
}
