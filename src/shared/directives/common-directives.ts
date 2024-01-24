import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { IonInput } from '@ionic/angular';

/*
numberOnly
alphaOnly
*/

@Directive({
  selector: '[numberOnly]',
  inputs: ['maxlength', 'cropZero'],
})
export class NumberOnlyDirective {
  maxlength!: number;
  private cropZero: boolean;
  private inputEl: any;

  constructor(private ionInput: IonInput, private control: NgControl) {
    this.cropZero = true;
    this.ionInput.getInputElement().then((inp) => {
      this.inputEl = inp;
    });
  }
  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this.inputEl.value;
    let newValue = initalValue;

    if (this.cropZero) {
      newValue = initalValue.replace(/^0(0+)?/g, '0');
    }
    newValue = newValue.replace(/[^0-9]*/g, '');

    if (this.maxlength && newValue.length > this.maxlength) {
      newValue = newValue.substring(0, this.maxlength);
    }
    this.inputEl.value = newValue;
    this.control.control!.setValue(newValue);

    if (initalValue !== this.inputEl.value) {
      event.stopPropagation();
    }
    //console.log(initalValue, newValue);
  }
}

@Directive({
  selector: '[alphaOnly]',
  inputs: ['maxlength', 'upperOnly'],
})
export class AlphaOnlyDirective {
  private maxlength!: number;
  private upperOnly!: boolean;
  private inputEl: any;

  constructor(private ionInput: IonInput, private control: NgControl) {
    this.ionInput.getInputElement().then((inp) => {
      this.inputEl = inp;
    });
  }
  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this.inputEl.value;
    let newValue = initalValue;

    newValue = newValue.replace(/[^a-zA-Z]*/g, '');

    if (this.maxlength && newValue.length > this.maxlength) {
      newValue = newValue.substring(0, this.maxlength);
    }
    if (this.upperOnly) newValue = newValue.toUpperCase();
    this.inputEl.value = newValue;
    this.control.control!.setValue(newValue);

    if (initalValue !== this.inputEl.value) {
      event.stopPropagation();
    }
    //console.log(initalValue, newValue);
  }
}
