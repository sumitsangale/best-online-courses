import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { CONFIG } from 'src/shared/services/config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  curentPage: number = 1;
  totalPage: number = 1;
  perPage: number = 1;
  constructor(public appService: AppService) {
    this.appService.getCourseData().then();
    this.perPage = CONFIG.PER_PAGE;
  }

  ngOnInit() {}

  next() {
    if (this.appService.filterData.length / this.perPage > this.curentPage) {
      this.curentPage++;
    }
  }

  prev() {
    if (this.curentPage > 1) {
      this.curentPage--;
    }
  }
}
