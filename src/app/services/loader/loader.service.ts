import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    public loadingController: LoadingController
  ) { }
  // Simple loader
simpleLoader() {
  this.loadingController.create({
      message: 'Loading...'
  }).then((response) => {
      response.present();
  });
}
// Dismiss loader
dismissLoader() {
  this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
  }).catch((err) => {
      console.log('Error occured : ', err);
  });
}
autoLoader(message,time) {
  this.loadingController.create({
    message: message,
    duration: time
  }).then((response) => {
    response.present();
    response.onDidDismiss().then((response) => {
      console.log('Loader dismissed', response);
    });
  });
} 
// Custom style + hide on tap loader
customLoader(message,time) {
  this.loadingController.create({
    message: message,
    duration: time,
    cssClass:'loader-css-class',
    backdropDismiss:true
  }).then((res) => {
    res.present();
  });
}
}
