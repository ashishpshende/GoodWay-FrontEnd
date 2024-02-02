import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Parcel } from 'src/app/models/Parcel';
import { LanguageService } from 'src/app/services/language/language.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-create-parcel',
  templateUrl: './create-parcel.page.html',
  styleUrls: ['./create-parcel.page.scss'],
})
export class CreateParcelPage implements OnInit {

  public parcel: Parcel;
  public cnTypes: Array<string> = [];
  constructor( public loadingCtrl: LoadingController,
    private userService: UserService,
    public alertController: AlertController,
    private languageService: LanguageService,
    private router: Router,
    private loaderService: LoaderService) {
      this.parcel = new Parcel({});
      this.cnTypes = ['TBB', 'Standard', 'Fragile'];
     }

  ngOnInit() {
  }
  goToParcelList()
  {
    
  }
  saveButtonClicked()
  {

  }
}
