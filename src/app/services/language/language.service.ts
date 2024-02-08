import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { KeywordConstants } from 'src/assets/constants/constants';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public language: string;
  public languageList = new Array();
  constructor(
    public alertController: AlertController,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService
  ) {
    this.getDeviceLanguage();
    this.createLanguageList();
  }
  createLanguageList() {
    if (!this.languageList || this.languageList.length == 0)
      this.languageList = [
        {
          name: 'English',
          label: 'English',
          value: 'en',
          type: 'radio',
          cssClass: 'alert-option-title',
          checked: false,
        },
        {
          name: 'Marathi',
          label: 'मराठी',
          value: 'mr',
          type: 'radio',
          cssClass: 'alert-option-title',
          checked: false,
        },
        {
          name: 'Hindi',
          label: 'हिंदी',
          value: 'hi',
          type: 'radio',
          cssClass: 'alert-option-title',
          checked: false,
        },
      ];
  }

  public translate(key: string): string {
    return this.translateService.instant(key);
  }

  public changeLanguage(): void {
    this._translateLanguage();
  }

  public _translateLanguage(): void {
    this.translateService.use(this.language ? this.language : 'en');
  }

  public setLanguage(language: string): void {
    this.createLanguageList();
    this.localStorageService
      .setItem(KeywordConstants.SELECTED_APP_LANGUAGE, language)
      .then(() => {
        this.localStorageService.StoredPreference.SelectedLanguage = language;
      });

    this.languageList.forEach((languageObject: any) => {
      if (languageObject['value'] == language) languageObject['checked'] = true;
      else languageObject['checked'] = false;
    });

    this.translateService.use(language);
  }

  public _initTranslate(language: any) {
    // Set the default language for translation strings, and the current language.
    this.translateService.setDefaultLang('mr');
    if (language) {
      this.language = language;
    } else {
      // Set your language here
      this.language = 'en';
    }
    this._translateLanguage();
  }

  public getDeviceLanguage() {
    if (this.localStorageService.StoredPreference.SelectedLanguage) {
      this.language =
        this.localStorageService.StoredPreference.SelectedLanguage;
      this.setLanguage(
        this.localStorageService.StoredPreference.SelectedLanguage
      );
    } else {
      if (window.Intl && typeof window.Intl === 'object') {
        if (navigator.language == 'en-US') this._initTranslate('en');
        else this._initTranslate(navigator.language);
      } else {
      }
    }
  }

  public getLanguageList() {
    this.createLanguageList();
    return this.languageList;
  }
  async presentLanguageSelctionMenu(changed: any) {
    const alert = await this.alertController.create({
      cssClass: 'language-alert-class',
      header: this.translate('GENERAL.LANGUAGE'),
      inputs: this.getLanguageList(),
      buttons: [
        {
          text: this.translate('BUTTONS.CANCEL'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (result) => {},
        },
        {
          cssClass: 'primary',
          text: this.translate('BUTTONS.OK'),
          handler: (result) => {
            this.setLanguage(result);
            changed();
          },
        },
      ],
    });
    await alert.present();
  }
}
