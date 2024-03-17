import { Injectable } from '@angular/core';
import { Parcel } from '../models/Parcel';
import { LanguageService } from './language/language.service';
import { HttpClient } from '@angular/common/http';
import { TemplateConstants } from 'src/assets/constants/templateConstants';
import { ParcelService } from './parcel/parcel.service';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  constructor(
    private parcelService: ParcelService,
    private languageService: LanguageService,
    private http: HttpClient
  ) {}

  print(parcels: Parcel[]) {
    var index = 0;
    var printableContent = ``;
    const printWindow = window.open('', '_blank', 'width=600,height=600');
    printWindow?.document.open();
    printWindow?.document.write(TemplateConstants.QR_PARCEL_LIST_PRINT_AREA_PART_1);
    printableContent +=TemplateConstants.QR_PARCEL_LIST_PRINT_AREA_PART_1;    
    parcels.forEach((parcel) => {
      const canvasElements = document.getElementsByTagName('canvas');
      printWindow?.document.write(this.replaceLabelAndValues(TemplateConstants.QR_PARCEL_PART_1, parcel));
      const canvas = canvasElements[index];
      const img = new Image();
      img.src = canvas.toDataURL('image/png');
      printWindow?.document.write('<div class="qr-div"><img src="' + img.src + '" style="width:40%;"></div>');
      printWindow?.document.write(this.replaceLabelAndValues(TemplateConstants.QR_PARCEL_PART_2, parcel));
      index++;
    });
    printWindow?.document.write(TemplateConstants.QR_PARCEL_LIST_PRINT_AREA_PART_2);
    printWindow?.document.close();
    printWindow?.print();
  }

  replaceLabelAndValues(text: string, parcel: Parcel) {
    //Labels
    text = text.replace(
      "{{'PARCEL.CN_NO'}}",
      this.languageService.translate('PARCEL.CN_NO')
    );
    text = text.replace(
      "{{'PARCEL.CN_TYPE'}}",
      this.languageService.translate('PARCEL.CN_TYPE')
    );
    text = text.replace(
      "{{'PARCEL.RECEIVER'}}",
      this.languageService.translate('PARCEL.RECEIVER')
    );
    text = text.replace(
      "{{'PARCEL.MOBILE'}}",
      this.languageService.translate('PARCEL.MOBILE')
    );
    text = text.replace(
      "{{'PARCEL.TO'}}",
      this.languageService.translate('PARCEL.TO')
    );
    text = text.replace(
      "{{'PARCEL.QUANTITY'}}",
      this.languageService.translate('PARCEL.QUANTITY')
    );
    text = text.replace(
      "{{'PARCEL.FROM'}}",
      this.languageService.translate('PARCEL.FROM')
    );
    text = text.replace(
      "{{'PARCEL.STATUS'}}",
      this.languageService.translate('PARCEL.STATUS')
    );

    //values
    text = text.replace('{{selectedParcel.cnNo}}', parcel.cnNo);
    text = text.replace('{{selectedParcel.cnNo}}', parcel.cnNo);
    text = text.replace('{{selectedParcel.cnNo}}', parcel.cnNo);
    text = text.replace('{{selectedParcel.cnType}}', parcel.cnType);
    text = text.replace('{{selectedParcel.receiver}}', parcel.receiver);
    text = text.replace('{{selectedParcel.mobile}}', parcel.mobile ?? '');
    text = text.replace('{{selectedParcel.parcelTo}}', parcel.parcelTo ?? '');
    text = text.replace('{{selectedParcel.quantity}}', parcel.quantity);
    text = text.replace('{{selectedParcel.parcelFrom}}', parcel.parcelFrom);
    text = text.replace('{{selectedParcel.parcelStatus}}', parcel.parcelStatus);

    return text;
  }
}
