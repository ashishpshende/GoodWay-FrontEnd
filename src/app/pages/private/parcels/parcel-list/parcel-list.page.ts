import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { Parcel } from "src/app/models/Parcel";
import { User } from "src/app/models/user";
import { LoaderService } from "src/app/services/loader/loader.service";
import { LocalStorageService } from "src/app/services/localStorage/local-storage.service";
import { ParcelService } from "src/app/services/parcel/parcel.service";

@Component({
  selector: "app-parcel-list",
  templateUrl: "./parcel-list.page.html",
  styleUrls: ["./parcel-list.page.scss"],
})
export class ParcelListPage implements OnInit {
  public skip: number = 0;
  public limit: number = 10;
  public searchText: string = "";
  public loggedInUser: User;
  public parcels: Parcel[];
  public searchToggle:boolean = true;
  constructor(
    public parcelService: ParcelService,
    public loaderService: LoaderService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;
    this.loadusers();
  }

  loadusers() {
    this.loaderService.customLoader("Loading Parcels...", 5000);

    this.parcelService.list(
      this.skip,
      this.limit,
      async (results) => {
        if(results.statusCode=="SUCCESS")
        {
          this.handleResponse(results);
        }
        else
        {

        }
        this.loaderService.dismissLoader();
      },
      (error) => {
        this.loaderService.dismissLoader();
      }
    );
  }
  handleResponse(response) {
    this.parcels = new Array();
    response.data.forEach((element) => {
      let parcel = new Parcel(element);
      parcel.icon = "/assets/icon/" + ( element.parcelStatus? element.parcelStatus:"undefined") + ".png";
     

      this.parcels.push(parcel)
    });
  }
  handleRefresh(event:any)
  {

  }
  addParcelButtonClicked()
  {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(["home/create-parcel"], navigationExtras);
  }
  searchTextButtonClicked()
  {

  }
  clearTextButtonClicked()
  {
      this.searchText = "";
  }
  parcelSelected(selectedParcel:Parcel)
  {
      this.parcelService.selectedParcel = selectedParcel;
      const navigationExtras: NavigationExtras = {
        queryParams: {
          ts: new Date().getMilliseconds()
        }
      };
      this.router.navigate(["home/view-parcel"], navigationExtras);
  }
  editButtonClicked(selectedParcel:Parcel)
  {
    this.parcelService.selectedParcel = selectedParcel;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(["home/update-parcel"], navigationExtras);
  }
  qrButtonClicked(selectedParcel:Parcel)
  {
    this.parcelService.selectedParcel = selectedParcel;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(["home/qr-code"], navigationExtras);
  }
  
}
