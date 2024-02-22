import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-scan-qr-code',
  templateUrl: './scan-qr-code.page.html',
  styleUrls: ['./scan-qr-code.page.scss'],
})
export class ScanQrCodePage implements OnInit {
  isSupported = false;
  public cnNumber:String=" Scan Code";
  constructor(private alertController: AlertController,
    private router: Router) {

  }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.cnNumber = barcodes[0].rawValue;
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
      
    });
    await alert.present();
  }
  parcelSelected(selectedCN:string)
  {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ts: new Date().getMilliseconds(),
          "cnNo":selectedCN
        }
      };
      this.router.navigate(["home/view-parcel"], navigationExtras);
  }
}
