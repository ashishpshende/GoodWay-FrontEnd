import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {LocalNotificationsPlugin, LocalNotifications, Attachment, ActionPerformed} from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(private router: Router) { }
  async ngOnInit() {
    await LocalNotifications.requestPermissions();
  }

  async generateNotification(){
    const notfi = await LocalNotifications.schedule({
      notifications:[
        {
          title: 'Search Results Available',
          body: 'Click here for details...',
          id: 1,
          //schedule:{ at: new Date( Date.now()+1000*2) },
          sound: 'sound.wav',
          smallIcon: 'ic_stat_org_logo',
          actionTypeId: '',
          extra:{
            data: 'Results matching with the scheduled search'
          }
        }
      ]
    });
    console.log('scheduled notifications: '+ notfi);
    LocalNotifications.addListener('localNotificationActionPerformed', (notificationAction: ActionPerformed) => {
      this.router.navigate(['/home/lookup-list']);
    });
  }
}
