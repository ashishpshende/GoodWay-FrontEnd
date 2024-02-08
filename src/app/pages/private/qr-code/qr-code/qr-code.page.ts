import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Parcel } from 'src/app/models/Parcel';
import { User } from '../../../../models/User';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { ParcelService } from 'src/app/services/parcel/parcel.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  public selectedParcel: Parcel;
  public loggedInUser: User;

  constructor(
    private parcelService: ParcelService,
    private router: Router,
    private route: ActivatedRoute,
    private authorizationService: AuthorizationService
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

  markAsDelivered() {}
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
    this.parcelService.readByCnNo(
      cnNo,
      async (results: any) => {
        if (results.statusCode == 'SUCCESS') {
          this.selectedParcel = results.data;
          this.parcelService.selectedParcel = results.data;
        } else {
        }
      },
      () => {}
    );
  }
}
