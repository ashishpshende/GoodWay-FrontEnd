import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Parcel } from 'src/app/models/Parcel';
import { User } from '../../../../models/User';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { ParcelService } from 'src/app/services/parcel/parcel.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { KeywordConstants } from 'src/assets/constants/constants';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language/language.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  @ViewChild('printableContent', { static: false })
  printableContent: ElementRef<any>;
  public showDetails: boolean = false;
  public actionLabel: string = 'Mark as';
  public errorDetailsMessage: string = '';
  public showEmptyCard: boolean = false;
  public selectedParcel: Parcel;
  public loggedInUser: User;
  public showPrint: boolean = false;

  public showMarkAsLoaded: boolean = false;
  public showMarkAsUnLoaded: boolean = false;
  public showMarkAsDeliverd: boolean = false;

  constructor(
    private platform: Platform,
    private parcelService: ParcelService,
    private router: Router,
    private loaderService: LoaderService,
    private languageService: LanguageService,
    private printService: PrintService,
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
  }

  print() {
    this.printService.print([this.selectedParcel]);
  }

  markAsDelivered() {
    this.markParcelAs(KeywordConstants.PARCEL_STATUS_DELIVERED);
  }
  markAsLoaded() {
    this.markParcelAs(KeywordConstants.PARCEL_STATUS_IN_TRANSIT);
  }
  markAsUnloaded() {
    this.markParcelAs(KeywordConstants.PARCEL_STATUS_UNLOADED);
  }
  markParcelAs(status: string) {
    this.loaderService.customLoader('Updating Details...', 5000);
    this.selectedParcel.parcelStatus = status;
    this.parcelService.updateStatus(
      this.selectedParcel,
      async (results: any) => {
        this.loaderService.dismissLoader();
        if (results.statusCode == 'SUCCESS') {
          this.showMarkAsDeliverd = false;
          this.showMarkAsLoaded = false;
          this.showMarkAsUnLoaded = false;
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
          this.parcelService.selectedParcel = results.data;
          this.selectedParcel = results.data;

          switch (this.loggedInUser.userRole) {
            case KeywordConstants.ROLE_ADMIN:
              this.showPrint = (!this.platform.is('android') && !this.platform.is('ios'));
              this.showDetails = true;
              this.showEmptyCard = false;
              if (
                this.selectedParcel.parcelStatus ===
                KeywordConstants.PARCEL_STATUS_NEW
              ) {
                this.showMarkAsLoaded =true;
              }
              else
              if (
                this.selectedParcel.parcelStatus ===
                KeywordConstants.PARCEL_STATUS_IN_TRANSIT
              ) {
                this.showMarkAsUnLoaded =true;
              }
              else
              if (
                this.selectedParcel.parcelStatus ===
                KeywordConstants.PARCEL_STATUS_UNLOADED
              ) {
                this.showMarkAsDeliverd =true;
              }
              break;
            case KeywordConstants.ROLE_DEALER:
              if (this.selectedParcel.createdBy.id === this.loggedInUser.id) {
                this.showPrint = (!this.platform.is('android') && !this.platform.is('ios'));;
                this.showDetails = true;
                this.showEmptyCard = false;
              } else {
                this.showDetails = false;
                this.showEmptyCard = true;
                this.errorDetailsMessage =
                  'The Parcel you trying get is not belongs to you.';
              }
              break;
            case KeywordConstants.ROLE_LOADER:
              if (
                this.selectedParcel.parcelStatus ===
                KeywordConstants.PARCEL_STATUS_NEW
              ) {
              
                this.showDetails = true;
                this.showMarkAsLoaded = true;
                this.showEmptyCard = false;
              } else {
                this.showDetails = false;
                this.showEmptyCard = true;
                this.errorDetailsMessage =
                  'The Parcel you trying get is not ready to pickup.';
              }
              break;
            case KeywordConstants.ROLE_UNLOADER:
              if (
                this.selectedParcel.parcelStatus ===
                KeywordConstants.PARCEL_STATUS_IN_TRANSIT
              ) {
                this.showMarkAsUnLoaded = true;
                this.showDetails = true;
              } else {
                this.showDetails = false;
                this.showEmptyCard = true;
                this.errorDetailsMessage =
                  'The Parcel you trying get is not ready to unload.';
              }
              break;
            case KeywordConstants.ROLE_SUB_DEALDER:
              if (
                this.selectedParcel.parcelStatus ===
                KeywordConstants.PARCEL_STATUS_UNLOADED && this.selectedParcel.parcelTo === this.loggedInUser.city
              ) {
                this.showMarkAsDeliverd = true;
                this.showDetails = true;
              } else {
                this.showDetails = false;
                this.showEmptyCard = true;
                this.errorDetailsMessage =
                  'The Parcel you trying get is not ready to deliver.';
              }
              break;
            default: {
              this.showDetails = false;
              this.showEmptyCard = true;
              this.errorDetailsMessage =
                'The Parcel you trying get is not assigned to you.';
            }
          }
        } else {
          this.showFailureMessage();
        }
      },
      () => {
        this.showFailureMessage();
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
  public showFailureMessage() {
    this.errorDetailsMessage = this.languageService.translate(
      'EMPTY_RECORDS.TITLE'
    );
    this.showDetails = false;
    this.showEmptyCard = true;
  }
}
