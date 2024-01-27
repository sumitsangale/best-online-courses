import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CORE_DIRECTIVES } from './directives/index';
import { CORE_COMPONENTS } from './component';
import { CORE_PIPES } from './pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [...CORE_DIRECTIVES, ...CORE_COMPONENTS, ...CORE_PIPES],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...CORE_DIRECTIVES,
    ...CORE_COMPONENTS,
    ...CORE_PIPES,
  ],
  providers: CORE_PIPES,
})
export class SharedModule {}
