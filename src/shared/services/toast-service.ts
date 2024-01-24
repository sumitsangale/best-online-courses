import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(public toastController: ToastController) {}
  async showTop(message: string, color = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      cssClass: 'ion-text-center',
      color,
      position: 'top',
    });
    toast.present();
  }
  async showBottom(message: string, color = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      cssClass: 'ion-text-center',
      color,
      position: 'bottom',
    });
    toast.present();
  }
}
