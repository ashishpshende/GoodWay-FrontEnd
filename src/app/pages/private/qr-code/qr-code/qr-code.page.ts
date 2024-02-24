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
  @ViewChild('printableContent', { static: false })
  printableContent: ElementRef<any>;
  public showDetails:boolean = false;
  public errorDetailsMessage:string = "";
  public showEmptyCard:boolean =false;
  public selectedParcel: Parcel;
  public loggedInUser: User;
  public showPrint: boolean = false;
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
    if (this.authorizationService.loggedInUser.userRole != 'SubDealer') {
      this.showPrint = true;
    }
  }

  print() {
    const printWindow = window.open('', '_blank', 'width=600,height=600');
    printWindow?.document.open();
    var starthtmlTags = `<html>
    <head>
      <title>CN NO: {{selectedParcel.cnNo}}</title>
      <style>
        .printableContent {
          margin: 10px;
          border-color: black;
          border-style: groove;
          border-width: 1px;
          padding: 30px;
          font-family: sans-serif;
        }
  
        .qr-area {
          text-align: center;
          padding: 10px;
        }
        .qr-div {
          margin-bottom: 20px;
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
    <body>`;   
    var firstPart = `<div id="printableContent" class="printableContent">  <table style="width: 100%">    <tr>      <td>        <div class="qr-area">`;
    var lastPart = `<div class="parcel-number-area">
  <div class="bold-parcel-number">{{selectedParcel.cnNo}}</div>
</div>
</div>
</td>
<td>
<div class="parcel-attribute-area">
<div class="parcel-attribute-row">
  <table style="width: 100%">
    <tr>
      <td class="parcel-attribute-label">
        {{'PARCEL.CN_NO'}}:
      </td>
      <td class="parcel-attribute-value">
        {{selectedParcel.cnNo}}
      </td>
    </tr>
  </table>
</div>
<div class="parcel-attribute-row">
  <table style="width: 100%">
    <tr>
      <td class="parcel-attribute-label">
        {{'PARCEL.CN_TYPE'}}:
      </td>
      <td class="parcel-attribute-value">
        {{selectedParcel.cnType}}
      </td>
    </tr>
  </table>
</div>
<div class="parcel-attribute-row">
  <table style="width: 100%">
    <tr>
      <td class="parcel-attribute-label">
        {{'PARCEL.RECEIVER'}}:
      </td>
      <td class="parcel-attribute-value">
        {{selectedParcel.receiver}}
      </td>
    </tr>
  </table>
</div>
<div class="parcel-attribute-row">
  <table style="width: 100%">
    <tr>
      <td class="parcel-attribute-label">
        {{'PARCEL.MOBILE'}}:
      </td>
      <td class="parcel-attribute-value">
        {{selectedParcel.mobile}}
      </td>
    </tr>
  </table>
</div>
<div class="parcel-attribute-row">
  <table style="width: 100%">
    <tr>
      <td  class="parcel-attribute-label">
        {{'PARCEL.TO'}}:
      </td>
      <td class="parcel-attribute-value">
        {{selectedParcel.to}}
      </td>
    </tr>
  </table>
</div>
<div class="parcel-attribute-row">
  <table style="width: 100%">
    <tr>
      <td class="parcel-attribute-label">
        {{'PARCEL.QUANTITY'}}:
      </td>
      <td class="parcel-attribute-value">
        {{selectedParcel.quantity}}
      </td>
    </tr>
  </table>
</div>
<div class="parcel-attribute-row">
  <table style="width: 100%">
    <tr>
      <td class="parcel-attribute-label">
        {{'PARCEL.FROM'}}:
      </td>
      <td class="parcel-attribute-value">
        {{selectedParcel.parcelFrom}}
      </td>
    </tr>
  </table>
</div>
</div>
</td>
</tr>

</table>
</div>
</td>
</tr>
</table>
    </div>`;
    var endhtmlTags = `</body>
    </html>`;
    printWindow?.document.write(this.replaceLabelAndValues(starthtmlTags));
    printWindow?.document.write(this.replaceLabelAndValues(firstPart));
    const canvasElements = document.getElementsByTagName('canvas');

    for (let i = 0; i < canvasElements.length; i++) {
      const canvas = canvasElements[i];
      const img = new Image();

      // Convert canvas content to data URL
      img.src = canvas.toDataURL('image/png');

      // Replace canvas with img in the print window
      printWindow?.document.write('<div class="qr-div">');
      printWindow?.document.write(
        '<img src="' + img.src + '" style="width:80%;">'
      );
      printWindow?.document.write('</div>');
    }
    printWindow?.document.write(this.replaceLabelAndValues(lastPart));
    printWindow?.document.write(this.replaceLabelAndValues(endhtmlTags));
    printWindow?.document.close();
    printWindow?.print();
  }
  replaceLabelAndValues(text:string)
  {
    //Labels
    text = text.replace("{{'PARCEL.CN_NO'}}", this.languageService.translate('PARCEL.CN_NO'));
    text = text.replace("{{'PARCEL.CN_TYPE'}}", this.languageService.translate('PARCEL.CN_TYPE'));
    text = text.replace("{{'PARCEL.RECEIVER'}}", this.languageService.translate('PARCEL.RECEIVER'));
    text = text.replace("{{'PARCEL.MOBILE'}}", this.languageService.translate('PARCEL.MOBILE'));
    text = text.replace("{{'PARCEL.TO'}}", this.languageService.translate('PARCEL.TO'));
    text = text.replace("{{'PARCEL.QUANTITY'}}", this.languageService.translate('PARCEL.QUANTITY'));
    text = text.replace("{{'PARCEL.FROM'}}", this.languageService.translate('PARCEL.FROM'));
    text = text.replace("{{'PARCEL.STATUS'}}", this.languageService.translate('PARCEL.STATUS'));


  
    //values
    text = text.replace('{{selectedParcel.cnNo}}',this.selectedParcel.cnNo);
    text = text.replace('{{selectedParcel.cnNo}}',this.selectedParcel.cnNo);
    text = text.replace('{{selectedParcel.cnNo}}',this.selectedParcel.cnNo);
    text = text.replace('{{selectedParcel.cnType}}',this.selectedParcel.cnType);
    text = text.replace('{{selectedParcel.receiver}}',this.selectedParcel.receiver);
    text = text.replace('{{selectedParcel.mobile}}',this.selectedParcel.mobile??"");
    text = text.replace('{{selectedParcel.parcelTo}}',this.selectedParcel.parcelTo??"");
    text = text.replace('{{selectedParcel.quantity}}',this.selectedParcel.quantity);
    text = text.replace('{{selectedParcel.parcelFrom}}',this.selectedParcel.parcelFrom);
    text = text.replace('{{selectedParcel.parcelStatus}}',this.selectedParcel.parcelStatus);


    return text;
  }
  markAsDelivered() {
    this.loaderService.customLoader('Updating Details...', 5000);
    this.selectedParcel.parcelStatus = KeywordConstants.PARCEL_STATUS_DELIVERED;
    this.parcelService.updateStatus(
      this.selectedParcel,
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
    this.router.navigate(['home'], navigationExtras);
  }
  getParceDetails(cnNo: string) {
    this.loaderService.customLoader('Loading Details...', 5000);
    this.parcelService.readByCnNo(
      cnNo,
      async (results: any) => {
        this.loaderService.dismissLoader();
        if (results.statusCode == 'SUCCESS') {
          if(this.selectedParcel.parcelTo === this.loggedInUser.city)
          {
            this.selectedParcel = results.data;
            this.parcelService.selectedParcel = results.data;
            this.showDetails = true;
            this.showEmptyCard = false;
          }
          else
          {
            this.showDetails = false;
            this.showEmptyCard = true;
            this.errorDetailsMessage = 'The Parcel you trying get is not assigned to you.';
          }
        } else {
        }
      },
      () => {
        this.errorDetailsMessage = this.languageService.translate('EMPTY_RECORDS.TITLE');
        this.showDetails = false;
        this.showEmptyCard = true;
      }
    );
  }
  //Alerts
  async presentAlert(
    headerTitle = this.languageService.translate('LOGIN.ERROR_ALERT_TITLE'),
    message = this.languageService.translate(
      'LOGIN.ERROR_INVALID_CREDENTIALS_MESSAGE'
    )
  ) {
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
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
