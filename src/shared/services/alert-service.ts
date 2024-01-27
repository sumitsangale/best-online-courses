import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alert: any;
  constructor(public alertCtrl: AlertController) {}

  presentAlert(
    title: string,
    message: string,
    yesHandler?: any,
    noHandler?: any,
    actionLabel?: string,
    cancelLabel?: string
  ) {
    let buttons: Array<any> = [];
    if (actionLabel) {
      buttons.push({
        text: actionLabel || 'YES',
        role: 'confirm',
        handler: () => {
          console.log('Yes clicked');
          yesHandler();
        },
      });
    }
    if (cancelLabel) {
      buttons.push({
        text: cancelLabel || 'NO',
        role: 'cancel',
        handler: () => {
          console.log('No clicked');
          noHandler();
        },
      });
    }
    this.alertCtrl
      .create({
        backdropDismiss: false,
        message: message,
        header: title,
        buttons,
      })
      .then((alert) => {
        this.alert = alert;
        alert.present();
      });
  }

  dismiss() {
    if (this.alert && !this.alert._detached) {
      console.log('call alert dismiss!');
      this.alert.dismiss();
    }
  }
}
