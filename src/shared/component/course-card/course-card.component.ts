import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  timer: any;
  interval: any;
  sub!: Subscription;

  constructor(
    public appService: AppService,
    public apiService: ApiService,
    public router: Router
  ) {}

  ngOnInit() {
    this.calculateDiscount();
    this.sub = this.apiService.currentAction.subscribe((resp) => {
      if (resp.action === 'cart_updated') {
        this.appService.cartItems[this.course.courseName]
          ? (this.isAdded = true)
          : (this.isAdded = false);
      }
    });
    if (this.discountedPrice) {
      this.initDayEnd();
      this.interval = setInterval(() => {
        this.initDayEnd();
      }, 1000);
    }
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

  goToCourseDetail() {
    this.router.navigate(['courses', this.course.courseName]);
  }

  initDayEnd() {
    let now = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    this.timer = (tomorrow.getTime() - now.getTime()) / 1000;
  }

  ionViewWillLeave() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
