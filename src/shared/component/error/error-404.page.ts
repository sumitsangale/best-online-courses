import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-404',
  templateUrl: './error-404.page.html',
})
export class Error404Page implements OnInit, OnDestroy {
  private routerSubscription: Subscription;
  error: any;

  constructor(private router: Router) {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.indexOf('/400') !== -1) {
          this.error = 400;
        } else if (event.urlAfterRedirects.indexOf('/401') !== -1) {
          this.error = 401;
        } else if (event.urlAfterRedirects.indexOf('/403') !== -1) {
          this.error = 403;
        } else if (event.urlAfterRedirects.indexOf('/500') !== -1) {
          this.error = 500;
        } else {
          this.error = 404;
        }
      }
    });
  }

  ngOnInit() {}

  goToHome() {
    this.router.navigate([]);
  }

  ngOnDestroy() {
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
  }
}
