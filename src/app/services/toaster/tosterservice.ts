import { Injectable, ViewContainerRef } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable()
export class Toaster {
    options: any;
    constructor(public toastController: ToastController) {

    }
    async showSuccess(message: string, duration: number = 3000) {
        const toast = await this.toastController.create({
            message: message,
            duration: duration,
            showCloseButton: true,
            position: 'middle',
            closeButtonText: 'Done',
            animated: true,
            color: "success"
        });
        toast.present();
    }
    async showError(message: string, duration: number = 3000) {
        const toast = await this.toastController.create({
            message: message,
            duration: duration,
            showCloseButton: true,
            position: 'middle',
            closeButtonText: 'Done',
            animated: true,
            color: "danger"
        });
        toast.present();
    }
    async showWarning(message: string, duration: number = 9000000) {
        const toast = await this.toastController.create({
            message: message,
            duration: duration,
            showCloseButton: true,
            position: 'middle',
            closeButtonText: 'Done',
            animated: true,
            color: "warning"
        });
        toast.present();
    }
}


