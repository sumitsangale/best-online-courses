import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppService } from '../service/app.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  routeSub!: Subscription;

  courseDetails: any;

  constructor(public route: ActivatedRoute, public appService: AppService) {
    this.routeSub = this.route.params.subscribe((params) => {
      this.courseDetails = this.appService.courseData.find(
        (ele: any) => ele?.courseName === params['id']
      );
    });
  }

  ngOnInit() {}
}
