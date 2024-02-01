import { Injectable } from '@angular/core';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class NetworkStatusService {
  public isOnline = new BehaviorSubject(false);
  constructor(
    public alertController: AlertController,
     private network: Network) { 


     
    this.network.onDisconnect().subscribe(() => {
      this.isOnline.next(false);       
    //  this.presentAlert(this.languageService.translate('NETWORK.STATUS_UPDATED_TITLE'),this.languageService.translate('NETWORK.STATUS_UPDATED_ONLINE_MESSAGE'));
    });

    // watch network for a connection
    this.network.onConnect().subscribe(() => {      
      this.isOnline.next(true); 
      //this.presentAlert(this.languageService.translate('NETWORK.STATUS_UPDATED_TITLE'),this.languageService.translate('NETWORK.STATUS_UPDATED_OFFLINE_MESSAGE'));
    });
  }
  async presentAlert(headerTitle = "Status" , message = "Message") {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: headerTitle,
      subHeader: "",
      message: message,
      buttons: ["OK"]// [this.languageService.translate('BUTTONS.OK')]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
