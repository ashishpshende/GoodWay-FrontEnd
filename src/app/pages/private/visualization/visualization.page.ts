/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { AfterViewInit, ElementRef, Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { KeywordConstants } from 'src/assets/constants/constants';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ChartComponent,ApexNonAxisChartSeries, ApexResponsive, ApexChart, ApexFill, ApexTitleSubtitle,ApexPlotOptions } from 'ng-apexcharts';
import { VisualizationService } from 'src/app/services/visualization/visualization.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.page.html',
  styleUrls: ['./visualization.page.scss'],
})
export class VisualizationPage implements OnInit, AfterViewInit {
  public loggedInUser: User;
  public users: User[];
  public showBy: string[];
  public selectedItem: string;
  public series: number[];
  public label: string[];
  public showChart: boolean;
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private userService: UserService,
    private visualizationService: VisualizationService,
    public loaderService: LoaderService,
    private router: Router,
    private localStorageService: LocalStorageService) {
    this.users = new Array<User>();
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
      }
    });
    this.showChart = false;
    //this.pieChart();
  }

  ngOnInit() {
    this.loggedInUser = this.localStorageService.StoredPreference.LoggedInUser;
  }

  ngAfterViewInit(): void {
    this.showBy = this.visualizationService.showBy;
  }

  showByChanged(){
    this.loaderService.customLoader('Loading Visualization...', 90000);
    this.visualizationService.loadVisualization(this.selectedItem, resp => {
      this.showChart = true;
      this.label = resp.labels;
      this.series = resp.series;
      this.pieChart();
      this.loaderService.dismissLoader();
    }, error => {
      this.loaderService.dismissLoader();
    });
  }

  setShowByFields(){
    this.loaderService.customLoader('Loading Show by fields...', 10000);
    this.visualizationService.loadVisualization(this.selectedItem, resp => {
      this.showBy = this.visualizationService.showBy;
      this.loaderService.dismissLoader();
    }, error => {
      this.loaderService.dismissLoader();
    });
  }

  pieChart(){
    this.chartOptions = {
      series: this.series,
      chart: {
        width: 400,
        type: 'pie'
      },
      labels: this.label,
      title: {
        text: 'Vehicles Statistics',
        align: 'center'
      },
      fill: {
        type: 'gradient'
      },
      plotOptions:{
        pie:{
          donut:{
            size: '100%'
          }
        }
      },
      responsive: [
        {
          breakpoint: 500,
          options: {
            chart: {
              width: 400
            },
            legend: {
              position: 'bottom',
              floating: false,
              horizontalAlign: 'center'
            }
          }
        }
      ]
    };
  }

  //modal
  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  handleRefresh(ev){
    if(this.selectedItem !== undefined && this.selectedItem !== ''){
      this.visualizationService.loadVisualization(this.selectedItem, resp => {
        this.showChart = true;
        this.label = resp.labels;
        this.series = resp.series;
        this.pieChart();
        ev.target.complete();
      }, error => {
        ev.target.complete();
      });
    }
    else{
      ev.target.complete();
    }
  }
}
