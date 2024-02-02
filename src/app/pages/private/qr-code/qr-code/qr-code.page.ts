import { Component, OnInit } from '@angular/core';
import { Parcel } from 'src/app/models/Parcel';
import { ParcelService } from 'src/app/services/parcel/parcel.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {

  public selectedParcel:Parcel;
  constructor(
    private parcelService:ParcelService
  ) { 
    this.selectedParcel = parcelService.selectedParcel;
  }

  ngOnInit() {

  }

}
