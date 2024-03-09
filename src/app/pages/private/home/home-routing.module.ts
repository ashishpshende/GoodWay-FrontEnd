/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/services/authGuard/auth-guard.service';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [AuthGuardService],
    children:[
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'user-list',
        loadChildren: () => import('../UAM/user-list/user-list.module').then( m => m.UserListPageModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'visualization',
        loadChildren: () => import('../visualization/visualization.module').then( m => m.VisualizationPageModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'create-user',
        loadChildren: () => import('../UAM/create-user/create-user.module').then( m => m.CreateUserPageModule)
      },
      {
        path: 'update-user',
        loadChildren: () => import('../UAM/update-user/update-user.module').then( m => m.UpdateUserPageModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'user-details',
        loadChildren: () => import('../UAM/user-details/user-details.module').then( m => m.UserDetailsPageModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'lookup-list',
        loadChildren: () => import('../lookup/lookup-list/lookup-list.module').then( m => m.LookupListPageModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'create-lookup',
        loadChildren: () => import('../lookup/create-lookup/create-lookup.module').then( m => m.CreateLookupPageModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'update-lookup',
        loadChildren: () => import('../lookup/update-lookup/update-lookup.module').then( m => m.UpdateLookupPageModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings/settings.module').then( m => m.SettingsPageModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'parcel-list',
        loadChildren: () => import('../parcels/parcel-list/parcel-list.module').then( m => m.ParcelListPageModule)
      },
      {
        path: 'view-parcel',
        loadChildren: () => import('../parcels/parcel-details/parcel-details.module').then( m => m.ParcelDetailsPageModule)
      },
      {
        path: 'update-parcel',
        loadChildren: () => import('../parcels/update-parcel/update-parcel.module').then( m => m.UpdateParcelPageModule)
      },
      {
        path: 'create-parcel',
        loadChildren: () => import('../parcels/create-parcel/create-parcel.module').then( m => m.CreateParcelPageModule)
      },
      {
        path: 'dealer-list',
        loadChildren: () => import('../dealers/dealer-list/dealer-list.module').then( m => m.DealerListPageModule)
      },
      {
        path: 'sub-dealer-list',
        loadChildren: () => import('../sub-dealers/sub-dealer-list/sub-dealer-list.module').then( m => m.SubDealerListPageModule)
      },
      {
        path: 'view-sub-dealer',
        loadChildren: () => import('../sub-dealers/view-sub-dealer/view-sub-dealer.module').then( m => m.ViewSubDealerPageModule)
      },
      {
        path: 'create-sub-dealer',
        loadChildren: () => import('../sub-dealers/create-sub-dealer/create-sub-dealer.module').then( m => m.CreateSubDealerPageModule)
      },
      {
        path: 'update-sub-dealer',
        loadChildren: () => import('../sub-dealers/update-sub-dealer/update-sub-dealer.module').then( m => m.UpdateSubDealerPageModule)
      },
      {
        path: 'qr-code',
        loadChildren: () => import('../qr-code/qr-code/qr-code.module').then( m => m.QrCodePageModule)
      },
      {
        path: 'scan-qr-code',
        loadChildren: () => import('../qr-code/scan-qr-code/scan-qr-code.module').then( m => m.ScanQrCodePageModule)
      },
      {
        path: 'create-dealer',
        loadChildren: () => import('../dealers/create-dealer/create-dealer.module').then( m => m.CreateDealerPageModule)
      },
      {
        path: 'update-dealer',
        loadChildren: () => import('../dealers/update-dealer/update-dealer.module').then( m => m.UpdateDealerPageModule)
      },
      {
        path: 'view-dealer',
        loadChildren: () => import('../dealers/view-dealer/view-dealer.module').then( m => m.ViewDealerPageModule)
      },      
      {
        path: 'view-unloader-list',
        loadChildren: () => import('../unloading/view-unloader-list/view-unloader-list.module').then( m => m.ViewUnloaderListPageModule)
      },
      {
        path: 'create-unloader',
        loadChildren: () => import('../unloading/create-unloader/create-unloader.module').then( m => m.CreateUnloaderPageModule)
      },
      {
        path: 'update-unloader',
        loadChildren: () => import('../unloading/update-unloader/update-unloader.module').then( m => m.UpdateUnloaderPageModule)
      },
      {
        path: 'view-unloader',
        loadChildren: () => import('../unloading/view-unloader/view-unloader.module').then( m => m.ViewUnloaderPageModule)
      },
      {
        path: 'view-loader-list',
        loadChildren: () => import('../loading/view-loader-list/view-loader-list.module').then( m => m.ViewLoaderListPageModule)
      },
      {
        path: 'update-loader',
        loadChildren: () => import('../loading/update-loader/update-loader.module').then( m => m.UpdateLoaderPageModule)
      },
      {
        path: 'view-loader',
        loadChildren: () => import('../loading/view-loader/view-loader.module').then( m => m.ViewLoaderPageModule)
      },
      {
        path: 'create-loader',
        loadChildren: () => import('../loading/create-loader/create-loader.module').then( m => m.CreateLoaderPageModule)
      }
    
      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
