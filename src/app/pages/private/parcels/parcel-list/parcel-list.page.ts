import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { Parcel } from "src/app/models/Parcel";
import { User } from "../../../../models/User";
import { LoaderService } from "src/app/services/loader/loader.service";
import { LocalStorageService } from "src/app/services/localStorage/local-storage.service";
import { ParcelService } from "src/app/services/parcel/parcel.service";
import { PrintService } from "src/app/services/print.service";
import { KeywordConstants } from "src/assets/constants/constants";

@Component({
  selector: "app-parcel-list",
  templateUrl: "./parcel-list.page.html",
  styleUrls: ["./parcel-list.page.scss"],
})
export class ParcelListPage implements OnInit {
  public showEmptyCard:boolean = false;
  public skip: number = 0;
  public limit: number = 10;
  public searchText: string = "";
  public loggedInUser: User ;
  public selectedParcels: Parcel[] = new Array();
  public parcels: Parcel[] = new Array();
  public searchToggle:boolean = true;
  public showCheckBox:boolean = false;

  public selectAll:boolean = false;
  public selectedStatuses:string[] = new Array();
  public selectAllStatus:boolean = false;
  public selectNewStatus:boolean = false;
  public selectInTransitStatus:boolean = false;
  public selectDeliveredStatus:boolean = false;
  public selectToPickStatus:boolean = false;
  public selectToUnloadStatus:boolean = false;


  constructor(
    public parcelService: ParcelService,
    public loaderService: LoaderService,
    public printService:PrintService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {

  }

  ngOnInit() {
    this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;

    this.showCheckBox = (this.loggedInUser.userRole==="Admin" || this.loggedInUser.userRole==="Dealer" ) 
    this.loadusers();
  }

  loadusers() {
    this.loaderService.customLoader("Loading Parcels...", 5000);
    if(this.loggedInUser.userRole=== KeywordConstants.ROLE_SUB_DEALDER && this.loggedInUser.city)
    {
      this.parcelService.listBySubDealer(this.loggedInUser.city,
        this.skip,
        this.limit,
        async (results:any) => {
          if(results.statusCode=="SUCCESS")
          {
            this.handleResponse(results);
          }
          else
          {
            this.showEmptyCard =true;
            
          }
          this.loaderService.dismissLoader();
        },
        () => {
          this.showEmptyCard =true;

          this.loaderService.dismissLoader();
        }
      );
    }
    else if(this.loggedInUser.userRole===KeywordConstants.ROLE_LOADER)
    {
      this.parcelService.listByStatus(KeywordConstants.PARCEL_STATUS_NEW,
        this.skip,
        this.limit,
        async (results:any) => {
          if(results.statusCode=="SUCCESS")
          {
            this.handleResponse(results);
          }
          else
          {
            this.showEmptyCard =true;
  
          }
          this.loaderService.dismissLoader();
        },
        () => {
          this.loaderService.dismissLoader();
          this.showEmptyCard =true;

        }
      );
    }
    else if(this.loggedInUser.userRole===KeywordConstants.ROLE_UNLOADER)
    {
      this.parcelService.listByStatus(KeywordConstants.PARCEL_STATUS_IN_TRANSIT,
        this.skip,
        this.limit,
        async (results:any) => {
          if(results.statusCode=="SUCCESS")
          {
            this.handleResponse(results);
          }
          else
          {
            this.showEmptyCard =true;
  
          }
          this.loaderService.dismissLoader();
        },
        () => {
          this.loaderService.dismissLoader();
          this.showEmptyCard =true;

        }
      );
    }
    else
    {
      this.parcelService.list(
        this.skip,
        this.limit,
        async (results:any) => {
          if(results.statusCode=="SUCCESS")
          {
            this.handleResponse(results);
          }
          else
          {
            this.showEmptyCard =true;
  
          }
          this.loaderService.dismissLoader();
        },
        () => {
          this.loaderService.dismissLoader();
          this.showEmptyCard =true;

        }
      );
    }
   
  }
  
  handleResponse(response:any) {
    this.parcels = new Array();
    response.data.forEach((element:any) => {
      let parcel = new Parcel(element);
      parcel.icon = "/assets/icon/" + ( element.parcelStatus? element.parcelStatus:"undefined") + ".png";
      this.parcels.push(parcel)
    });
    this.showEmptyCard =this.parcels.length==0;
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
  parcelClicked(selectedParcel:Parcel)
  {
    this.parcelService.selectedParcel = selectedParcel;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
        "cnNo":selectedParcel.cnNo
      }
    };
    this.router.navigate(["home/view-parcel"], navigationExtras);
  }
  parcelSelected(selectedParcel:Parcel)
  {
      if(selectedParcel.picked && this.selectedParcels.filter(item => item.cnNo === selectedParcel.cnNo).length===0)
      {
        this.selectedParcels.push(selectedParcel);
      }
      else
      {
        this.selectedParcels = this.selectedParcels.filter(item => item.cnNo !== selectedParcel.cnNo);
      }
      console.log("selectedParcel: "+ JSON.stringify(this.selectedParcels))
  }
  editButtonClicked(selectedParcel:Parcel)
  {
    this.parcelService.selectedParcel = selectedParcel;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
        "cnNo":selectedParcel.cnNo
      }
    };
    this.router.navigate(["home/update-parcel"], navigationExtras);
  }
  qrButtonClicked(selectedParcel:Parcel)
  {
    this.parcelService.selectedParcel = selectedParcel;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
        "cnNo":selectedParcel.cnNo
      }
    };
    this.router.navigate(["home/qr-code"], navigationExtras);
  }
  public selectAllParcels()
  {
    this.parcels.forEach(parcel => {
      parcel.picked = this.selectAll;
    });
    if(this.selectAll)
      this.selectedParcels = this.parcels;    
    else
      this.selectedParcels = new Array()
    
      console.log("selectedParcel: "+ this.selectedParcels)
  }
  public printSelectedParcels()
  {
    console.log("selectedParcel: "+ this.selectedParcels)

    this.parcelService.selectedParcels = this.selectedParcels;

    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds(),
      }
    };
    this.router.navigate(["home/printble-parcel-list"], navigationExtras);
  }
  public selectAllStatusPicked()
  {
    
  }
}
