import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router, public appService: AppService) {}

  ngOnInit() {}

  gotoCart() {
    this.router.navigate(['cart']);
  }

  handleInput(event: any) {
    let { value } = event.detail;
    this.appService.filterCourses(value);
  }
}
