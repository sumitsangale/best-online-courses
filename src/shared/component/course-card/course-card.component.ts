import { Component, Input, OnInit } from '@angular/core';

import { AppService } from 'src/app/service/app.service';
import { ApiService } from 'src/shared/services';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() course: any;
  @Input() index: any;
  @Input() where: any;
  discountedPrice: any;
  isAdded: boolean = false;

  constructor(public appService: AppService, public apiService: ApiService) {}

  ngOnInit() {
    this.calculateDiscount();
    this.apiService.currentAction.subscribe((resp) => {
      if (resp.action === 'cart_updated') {
        this.appService.cartItems[this.course.courseName]
          ? (this.isAdded = true)
          : (this.isAdded = false);
      }
    });
  }

  calculateDiscount() {
    let actualPrice = this.retnum(this.course.actualPrice);
    let discount = this.retnum(this.course.discountPercentage);
    if (discount) {
      this.discountedPrice = Math.ceil(
        actualPrice - (actualPrice * discount) / 100
      );
    } else {
      this.discountedPrice = null;
    }
  }

  retnum(str: string) {
    var num = str.replace(/[^0-9]/g, '');
    return parseInt(num, 10);
  }

  addToCart() {
    this.appService.updateCart(this.course, 'add');
  }

  removeFromCart() {
    this.appService.updateCart(this.course, 'remove');
  }

  addToWishlist() {
    this.appService.updateWishlist(this.course, 'add');
  }

  removeFromWishlist() {
    this.appService.updateWishlist(this.course, 'remove');
  }
}
