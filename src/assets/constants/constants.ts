

export class KeywordConstants {

  public static AUTH_TOKEN_KEY = 'Authorization';
  public static SPREADSHEET_ID_KEY ="X-Spreadsheet-Id";

  public static DATE_FORMAT_STRING ='dd-MM-yyyy hh:mm:ss a';
  public static DATE_FORMAT_LANGUAGE = 'en-US';
  public static DATE_FORMAT_TIMES_ZONE_OFFSET ='+0530';



  public static LOGGED_IN_STATUS = 'SIGN_IN_STATUS';
  public static USER_NAME = 'USER_NAME';
  public static USER_PASSWORD = 'USER_PASSWORD';
  public static USER_OBJECT = 'USER_OBJECT';
  public static USER_EMAIL = 'USER_EMAIL';
  public static USER_ROW_INDEX = 'ROW_INDEX';


  public static ROLE_ADMIN = 'Admin';
  public static ROLE_SUB_DEALDER = 'SubDealer';
  public static ROLE_DEALER = 'Dealer';
  public static ROLE_LOADER = 'Loader';
  public static ROLE_UNLOADER = 'UnLoader';


  //==Dealer will Create Parcel, so Ststu will be New
  public static PARCEL_STATUS_NEW = 'New';   //Ready to Load ==> Loader
  public static PARCEL_STATUS_IN_TRANSIT = 'In-Transit';  // Ready to Unload ==> Unloader
  public static PARCEL_STATUS_UNLOADED = 'Unloaded'; // Ready to Deliver ==> SubDealer
  public static PARCEL_STATUS_DELIVERED = 'Delivered';

  //APP Language
  public static LOCALIZATION_ENABLED = "LOCALIZATION_ENABLED";
  public static SELECTED_APP_LANGUAGE =  "SELECTED_APP_LANGUAGE";
  public static DEFAULT_APP_LANGUAGE =  "DEFAULT_APP_LANGUAGE";

  }
