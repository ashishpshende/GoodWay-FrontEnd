import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Parcel } from 'src/app/models/Parcel';
import { User } from 'src/app/models/User';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { ParcelService } from 'src/app/services/parcel/parcel.service';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-printble-parcel-list',
  templateUrl: './printble-parcel-list.page.html',
  styleUrls: ['./printble-parcel-list.page.scss'],
})
export class PrintbleParcelListPage {
  public showEmptyCard: boolean = false;
  public skip: number = 0;
  public limit: number = 10;
  public searchText: string = '';
  public loggedInUser: User;
  public parcels: Parcel[] = new Array();
  public searchToggle: boolean = true;
  public selectAll: boolean = false;

  constructor(
    public parcelService: ParcelService,
    public loaderService: LoaderService,
    public printService: PrintService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.parcels = this.parcelService.selectedParcels;
  }

  handleResponse(response: any) {
    this.parcels = new Array();
    response.data.forEach((element: any) => {
      let parcel = new Parcel(element);
      parcel.icon =
        '/assets/icon/' +
        (element.parcelStatus ? element.parcelStatus : 'undefined') +
        '.png';
      this.parcels.push(parcel);
    });
    this.showEmptyCard = this.parcels.length == 0;
  }
  handleRefresh(event: any) {}

  public printSelectedParcels() {
    this.printService.print(this.parcels);
  }

  goToParcelList() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
      },
    };
    this.router.navigate(['home/parcel-list'], navigationExtras);
  }
  printButtonClicked() {
    this.printService.print(this.parcels);
  }
}
