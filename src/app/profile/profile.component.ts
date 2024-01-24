import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastService } from 'src/shared';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileFormGroup!: FormGroup;
  constructor(public fb: FormBuilder, public toast: ToastService) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.profileFormGroup = this.fb.group({
      displayName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: [''],
      aboutText: [''],
      areaOfInterest: [''],
      profession: [''],
      experience: [''],
      expertise: [''],
      role: [''],
    });
  }

  save() {
    console.log('form save', this.profileFormGroup.value);
    this.toast.showTop('Your profile is updated.');
  }
}
