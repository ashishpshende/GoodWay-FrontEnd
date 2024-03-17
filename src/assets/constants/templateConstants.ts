export class TemplateConstants {
  public static QR_PARCEL_LIST_PRINT_AREA_PART_1 = `
    <html>
  <head>
    <style>
      .printableContent {
        margin-left: 20px;
        margin-right: 20px;
        border-color: black;
        border-style: groove;
        border-width: 1px;
        padding: 30px;
        font-family: sans-serif;
      }
      .parcel-card-area{
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 20px;
        border-color: black;
        border-style: groove;
        border-width: 1px;
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
  <body> 
`;
  public static QR_PARCEL_LIST_PRINT_AREA_PART_2 = `
  </body>
  </html>`;
  
  public static QR_PARCEL_PART_1 = `
    <div class="parcel-card-area">
    <table style="width: 100%">
      <tr >
        <td>
          <div class="qr-area">`;
  public static QR_PARCEL_PART_2 = `
          <div class="parcel-number-area">
            <div class="bold-parcel-number">
              {{selectedParcel.cnNo}}
            </div>
          </div>
        </div>
        </td>
        <td>
          <div>
            <div class="parcel-attribute-row">
            <table style="width: 100%">
        <tr>
          <td class="parcel-attribute-label">{{'PARCEL.CN_NO'}}:</td>
          <td class="parcel-attribute-value">{{selectedParcel.cnNo}}</td>
        </tr>
      </table>
    </div>
    <div class="parcel-attribute-row">
      <table style="width: 100%">
        <tr>
          <td class="parcel-attribute-label">{{'PARCEL.CN_TYPE'}}:</td>
          <td class="parcel-attribute-value">{{selectedParcel.cnType}}</td>
        </tr>
      </table>
    </div>
    <div class="parcel-attribute-row">
      <table style="width: 100%">
        <tr>
          <td class="parcel-attribute-label">{{'PARCEL.RECEIVER'}}:</td>
          <td class="parcel-attribute-value">{{selectedParcel.receiver}}</td>
        </tr>
      </table>
    </div>
    <div class="parcel-attribute-row">
      <table style="width: 100%">
        <tr>
          <td class="parcel-attribute-label">{{'PARCEL.MOBILE'}}:</td>
          <td class="parcel-attribute-value">{{selectedParcel.mobile}}</td>
        </tr>
      </table>
    </div>
    <div class="parcel-attribute-row">
      <table style="width: 100%">
        <tr>
          <td class="parcel-attribute-label">{{'PARCEL.TO'}}:</td>
          <td class="parcel-attribute-value">{{selectedParcel.parcelTo}}</td>
        </tr>
      </table>
    </div>
    <div class="parcel-attribute-row">
      <table style="width: 100%">
        <tr>
          <td class="parcel-attribute-label">{{'PARCEL.QUANTITY'}}:</td>
          <td class="parcel-attribute-value">{{selectedParcel.quantity}}</td>
        </tr>
      </table>
    </div>
    <div class="parcel-attribute-row">
      <table style="width: 100%">
        <tr>
          <td class="parcel-attribute-label">{{'PARCEL.FROM'}}:</td>
          <td class="parcel-attribute-value">{{selectedParcel.parcelFrom}}</td>
        </tr>
      </table>
    </div>
      </div>
    </td>
  </tr>
</table>        
</div> `;
}
