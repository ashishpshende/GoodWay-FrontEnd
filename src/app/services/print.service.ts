import { Injectable } from '@angular/core';
import { Parcel } from '../models/Parcel';
import { LanguageService } from './language/language.service';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(private languageService:LanguageService) { }
  print(parcels:Parcel[] ) {
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
    for (let index = 0; index < parcels.length; index++) {
      const parcel = parcels[index];
      printWindow?.document.write(this.replaceLabelAndValues(starthtmlTags,parcel));
      printWindow?.document.write(this.replaceLabelAndValues(firstPart,parcel));
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
      printWindow?.document.write(this.replaceLabelAndValues(lastPart,parcel));
      printWindow?.document.write(this.replaceLabelAndValues(endhtmlTags,parcel));
  
    }
   
    printWindow?.document.close();
    printWindow?.print();
  }

  replaceLabelAndValues(text:string, parcel:Parcel)
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
    text = text.replace('{{selectedParcel.cnNo}}',parcel.cnNo);
    text = text.replace('{{selectedParcel.cnNo}}',parcel.cnNo);
    text = text.replace('{{selectedParcel.cnNo}}',parcel.cnNo);
    text = text.replace('{{selectedParcel.cnType}}',parcel.cnType);
    text = text.replace('{{selectedParcel.receiver}}',parcel.receiver);
    text = text.replace('{{selectedParcel.mobile}}',parcel.mobile??"");
    text = text.replace('{{selectedParcel.parcelTo}}',parcel.parcelTo??"");
    text = text.replace('{{selectedParcel.quantity}}',parcel.quantity);
    text = text.replace('{{selectedParcel.parcelFrom}}',parcel.parcelFrom);
    text = text.replace('{{selectedParcel.parcelStatus}}',parcel.parcelStatus);


    return text;
  }
}
