/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/authGuard/auth-guard.service';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/public/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/private/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/public/about-us/about-us.module').then( m => m.AboutUsPageModule),
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/public/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/public/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'forgot-username',
    loadChildren: () => import('./pages/public/forgot-username/forgot-username.module').then( m => m.ForgotUsernamePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/public/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'view-user-profile',
    loadChildren: () => import('./pages/private/UAM/view-user-profile/view-user-profile.module').then( m => m.ViewUserProfilePageModule)
  },
  {
    path: 'update-user-profile',
    loadChildren: () => import('./pages/private/UAM/update-user-profile/update-user-profile.module').then( m => m.UpdateUserProfilePageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/public/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'lookup-list',
    loadChildren: () => import('./pages/private/lookup/lookup-list/lookup-list.module').then( m => m.LookupListPageModule)
  },
  {
    path: 'create-lookup',
    loadChildren: () => import('./pages/private/lookup/create-lookup/create-lookup.module').then( m => m.CreateLookupPageModule)
  },
  {
    path: 'update-lookup',
    loadChildren: () => import('./pages/private/lookup/update-lookup/update-lookup.module').then( m => m.UpdateLookupPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {}
