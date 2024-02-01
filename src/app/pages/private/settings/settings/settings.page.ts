import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language/language.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { VisualizationService } from 'src/app/services/visualization/visualization.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, AfterViewInit {
  public languageSelected='en';
  public languageSelectedLabel='English';
  loading: any;
  public loggedInUser: User;
  constructor(
    private router: Router,
    public loadingController: LoadingController,
    private visualizationService: VisualizationService,
    private localStorageService: LocalStorageService,
    private languageService: LanguageService
  ) {
    this.loggedInUser = new User(JSON.parse('{}'));
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.serveBasedOnUserRole();
      }
    });
  }
  serveBasedOnUserRole() {
    //Role wise changes
    this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;
  }
  loadLocalizationDetails()
  {
    this.languageSelected = this.localStorageService.StoredPreference.SelectedLanguage;
    this.updateSelectedLanguageLabel();
  }

  ngAfterViewInit(): void {
    this.loadLocalizationDetails();
    this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;
  }

  ngOnInit() {
    this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;
  }


  languageChangeButtonClicked() {
    this.languageService.presentLanguageSelctionMenu(changed=>{
      this.initializeLoader('SETTINGS_PAGE.CHANGING_LANGUAGE_MESSAGE');
      setTimeout(() => {
        this.updateSelectedLanguageLabel();
          }, 3000);
    });
  }

  reloadMetaDataButtonClicked(){
    this.resetMetaData();
  }
  resetMetaData() {

    this.visualizationService.showBy = new Array<string>();
  }

  updateSelectedLanguageLabel()
  {
    this.languageSelected = this.localStorageService.StoredPreference.SelectedLanguage;
     this.languageService.getLanguageList().forEach(lang => {
      if(lang.value === this.languageSelected)
        {this.languageSelectedLabel = lang.label;}
     });
  }
    //Loaders
    async initializeLoader(message) {
      this.loading = await this.loadingController.create({
        message: this.languageService.translate(message),
        duration: 4000,
      });
      this.loading.present();
    }
}
