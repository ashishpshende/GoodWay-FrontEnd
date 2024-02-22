import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Parcel } from 'src/app/models/Parcel';
import { User } from '../../../../models/User';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { ParcelService } from 'src/app/services/parcel/parcel.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { KeywordConstants } from 'src/assets/constants/constants';
import { LoadingController, AlertController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language/language.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  @ViewChild('printableContent', { static: false }) printableContent: ElementRef<any>;

  public selectedParcel: Parcel;
  public loggedInUser: User;
  public showPrint:boolean=false;
  constructor(
    private parcelService: ParcelService,
    private router: Router,
    private loaderService: LoaderService,    
    private languageService: LanguageService,
    private localStorageService: LocalStorageService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    private authorizationService: AuthorizationService,
    private elementRef: ElementRef<HTMLElement>
  ) {
    this.selectedParcel = new Parcel({});
    this.loggedInUser = this.authorizationService.loggedInUser;
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        if (params['cnNo']) {
          this.selectedParcel.cnNo = params['cnNo'];
          this.getParceDetails(this.selectedParcel.cnNo);
        }
      }
    });
    if(this.authorizationService.loggedInUser.userRole!="SubDealer")
    {
      this.showPrint = true;
    }
  }
 
  print1(): void {
   
   // const elementId = this.elementRef.nativeElement.id;
    const element = document.getElementById("printableContent");
    //const printContents = this.printableContent.nativeElement.innerHTML;
    const popupWindow = window.open('', '_blank', 'width=600,height=600');
    popupWindow?.document.open();
    popupWindow?.document.write(`
      <html>
        <head>
          <style>
          .printableContent {
            margin: 10px;
            border-color: black;
            border-style: groove;
            border-width: 1px;
            padding: 30px;
          }
        
          .qr-area {
            text-align: center;
            padding: 10px;
          }
          .parcel-number-area {
            margin-top: 10px;
            font-size: medium;
          }
          .bold-parcel-number {
            font-size: large;
            text-align: center;
            margin-top: -30px;
            color: black;
          }
          .parcel-attribute-area {
            font-size: medium;
            padding-left: 80px;
          }
          .parcel-attribute-row {
            font-size: medium;
            width: 100%;
          }
          .parcel-attribute-label {
            font-weight: 100;
            width: 50%;
          }
          .parcel-attribute-value {
            width: 50%;
            font-weight: 800;
          }
          .status-area {
            font-size: medium;
          }
          </style>
        </head>
        <body onload="window.print(); window.onafterprint = window.close();">${element?.innerHTML}</body>
      </html>
    `);
    popupWindow?.document.close();
    // Handle canvas content
    const canvasElements = popupWindow?.document.getElementsByTagName('canvas') ;
    const tempCanvas = document.createElement('canvas');
    const canvasArray =Array.prototype.slice.call(canvasElements);

    canvasArray.forEach((canvas, index) => {
      const ctx = tempCanvas.getContext('2d');
      ctx?.drawImage(canvas, 0, 0);

      // Replace the canvas with an image of its content
      const img = document.createElement('img');
      img.src = tempCanvas.toDataURL();
      canvas.parentNode?.replaceChild(img, canvas);
    });

   

    
  }
   print() {
  const printWindow = window.open('', '_blank');
  printWindow?.document.write('<html><head><title>Print</title></head><body>');
  
  const canvasElements = document.getElementsByTagName('canvas');
  
  for (let i = 0; i < canvasElements.length; i++) {
    const canvas = canvasElements[i];
    const img = new Image();
    
    // Convert canvas content to data URL
    img.src = canvas.toDataURL('image/png');
    
    // Replace canvas with img in the print window
    printWindow?.document.write('<div style="page-break-after:always;">');
    printWindow?.document.write('<img src="' + img.src + '" style="width:100%;">');
    printWindow?.document.write('</div>');
  }
  printWindow?.document.write('</body></html>');
  printWindow?.document.close();
  printWindow?.print();
}

  markAsDelivered() {

    this.loaderService.customLoader("Updating Details...", 5000);
    this.selectedParcel.parcelStatus = KeywordConstants.PARCEL_STATUS_DELIVERED;
    this.parcelService.updateStatus(this.selectedParcel,
      async (results: any) => {
        this.loaderService.dismissLoader();
        if (results.statusCode == 'SUCCESS') {

        } else {
        }
      },
      () => {
        this.loaderService.dismissLoader();
      }
    );
  }
  viewButtonClicked() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
      },
    };
    this.router.navigate(['home/view-parcel'], navigationExtras);
  }
  editButtonClicked() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
      },
    };
    this.router.navigate(['home/update-parcel'], navigationExtras);
  }
  closeuttonClicked() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
      },
    };
    this.router.navigate(['home/parcel-list'], navigationExtras);
  }
  getParceDetails(cnNo: string) {
    this.loaderService.customLoader("Loading Details...", 5000);
    this.parcelService.readByCnNo(
      cnNo,
      async (results: any) => {
        this.loaderService.dismissLoader();
        if (results.statusCode == 'SUCCESS') {
          this.selectedParcel = results.data;
          this.parcelService.selectedParcel = results.data;
        } else {
        }
      },
      () => {}
    );
  }
    //Alerts
    async presentAlert(headerTitle = this.languageService.translate('LOGIN.ERROR_ALERT_TITLE'), message = this.languageService.translate('LOGIN.ERROR_INVALID_CREDENTIALS_MESSAGE')) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: headerTitle,
        subHeader: '',
        message,
        buttons: [
          {
            text: this.languageService.translate('BUTTONS.OK'),
            role: 'confirm',
            handler: () => {
              //this.logout();
            }
          }
        ]
      });
  
      await alert.present();
  
      const { role } = await alert.onDidDismiss();
    }
}
