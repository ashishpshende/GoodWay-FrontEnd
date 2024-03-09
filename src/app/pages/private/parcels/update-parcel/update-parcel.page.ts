import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Parcel } from 'src/app/models/Parcel';
import { User } from 'src/app/models/User';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ParcelService } from 'src/app/services/parcel/parcel.service';
import { UserService } from 'src/app/services/user/user.service';
import { KeywordConstants } from 'src/assets/constants/constants';

@Component({
  selector: 'app-update-parcel',
  templateUrl: './update-parcel.page.html',
  styleUrls: ['./update-parcel.page.scss'],
})
export class UpdateParcelPage implements OnInit {
  public loggedInUser: User;
  public parcel: Parcel;
  public cnTypes: Array<string> = [];
  constructor(
    public loadingCtrl: LoadingController,
    private userService: UserService,
    public alertController: AlertController,
    private languageService: LanguageService,
    private parcelService: ParcelService,
    private router: Router,
    private route: ActivatedRoute,
    private authorizationService: AuthorizationService,
    private loaderService: LoaderService
  ) {
    this.parcel = new Parcel({});
    this.loggedInUser = this.authorizationService.loggedInUser;
    this.cnTypes = this.parcelService.cnTypes;
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        if (params['cnNo']) {
          this.parcel.cnNo = params['cnNo'];
          this.getParceDetails(this.parcel.cnNo);
        }
      }
    });
    if (this.authorizationService.loggedInUser.userRole != 'SubDealer') {
    }
  }

  getParceDetails(cnNo: string) {
    this.loaderService.customLoader('Loading Details...', 5000);
    this.parcelService.readByCnNo(
      cnNo,
      async (results: any) => {
        this.loaderService.dismissLoader();
        if (results.statusCode == 'SUCCESS') {
          this.parcel = results.data;

          if (
            this.parcel.parcelTo === this.loggedInUser.city ||
            this.loggedInUser.userRole === 'Admin'
          ) {
            this.parcelService.selectedParcel = results.data;
          } else {
          }
        } else {
        }
      },
      () => {}
    );
  }
  goToParcelList() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
      },
    };
    this.router.navigate(['home/parcel-list'], navigationExtras);
  }
  updateButtonClicked() {
    this.loaderService.customLoader('Updating Parcel...', 10000);
    this.parcel.createdOn = formatDate(
      new Date(),
      KeywordConstants.DATE_FORMAT_STRING,
      KeywordConstants.DATE_FORMAT_LANGUAGE,
      KeywordConstants.DATE_FORMAT_TIMES_ZONE_OFFSET,
    );
    this.parcel.updatedOn = formatDate(
      new Date(),
      KeywordConstants.DATE_FORMAT_STRING,
      KeywordConstants.DATE_FORMAT_LANGUAGE,
      KeywordConstants.DATE_FORMAT_TIMES_ZONE_OFFSET,
    );
    this.parcelService.update(
      this.parcel,
      (results: any) => {
        this.goToParcelList();
        this.loaderService.dismissLoader();
      },
      () => {
        this.loaderService.dismissLoader();
      }
    );
  }
}
