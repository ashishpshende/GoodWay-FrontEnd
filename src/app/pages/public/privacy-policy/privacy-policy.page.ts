import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {
  public screenWidth: number;
  public screenHeight: number;
  constructor(platform: Platform,
    private router: Router,) {
    this.screenHeight = platform.height();
    this.screenWidth = platform.width();
  }

  ngOnInit() {
  }

  CancelButtonClicked() {

    this.router.navigate(["home/dashboard"]);
  }

}
