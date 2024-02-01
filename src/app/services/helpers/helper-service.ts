// import * as moment from "moment-timezone";
export class HelperService {

  static EmptyJSON() {
    return JSON.parse("{}")
  }
  getUUID() {
    return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  static getLocalDate(date: Date | string, format?: string) {

    // var localZone = moment.tz.guess();
    // if (format) {
    //   if (moment(date).isValid()) {
    //     return moment.utc(date).tz(localZone).format(format);
    //   }
    // }
    // else {
    //   if (moment(date).isValid()) {
    //     return moment.utc(date).tz(localZone);
    //   }
    // }
    return date;
  }
  static currencyToSymbol(currencyName: string) {
    switch (currencyName) {
      case "USD": return '$';
        break;
      case "SGD": return 'S$';
        break;
      case "INR": return '₹';
        break;
      case "AUD": return '$';
        break;
      case "BRL": return 'R$';
        break;
      case "CAD": return '$';
        break;
      case "CHF": return '₣';
        break;
      case "EUR": return '€';
        break;
      case "HKD": return '$';
        break;
      case "IDR": return 'Rp';
        break;
      case "IQD": return 'ع.د	';
        break;
      case "JPY": return '¥';
        break;
      case "KWD": return 'د.ك';
        break;
      case "LKR": return 'Rs';
        break;
      case "MXN": return '$';
        break;
      case "NZD": return '$';
        break;
      case "RUB": return 'р.';
        break;
      case "SEK": return 'kr';
        break;
      case "XAF": return '₣';
        break;
      case "ZWL": return '$';
        break;
      case "ZAR": return 'R';
        break;
      default: return '$';
        break;
    }
  }
  static getPasswordStrength(password: string) {
    if (password.length < 8)
    return -1;

    var strength = 0;
    var smallChars = false, capitalChars = false, numbers = false, specialChars = false

    if (password.match(/[a-z]+/)) {
      smallChars = true;
    }
    if (password.match(/[A-Z]+/)) {
      capitalChars = true;
    }
    if (password.match(/[0-9]+/)) {
      numbers = true;
    }
    if (password.match(/[$@#&!]+/)) {
      specialChars = true;
    }


    if (smallChars)
      strength += 0.33

    if (capitalChars)
      strength += 0.33

    if (numbers)
      strength += 0.34

    // if (specialChars)
    //   strength += 0.25

    return strength;

  }
  static validateEmail(email: string) {
    if(email==null || email =="")
      return false;
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(email) == false)
      {
          return false;
      }
    return true;
  }
  static validateMobileNumber(mobileNumber: string) {
    if(mobileNumber==null || mobileNumber =="")
      return false;
      var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if(mobileNumber.match(phoneno)) {
        return true;
      }
      else {

        return false;
      }
    return true;
  }
  static generateTempPassowrd() {
    var result = "password";
    var number =  Math.random();
    number = Math.floor(1000 + Math.random() * 99999);
    result = result +   number.toString();
    return result;
  }
}
