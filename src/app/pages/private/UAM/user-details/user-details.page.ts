import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit,AfterViewInit {
  public user: User;
  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService) {

    if(this.userService.selectedUser)
    {
      this.user = this.userService.selectedUser;
    }
    else
    {
      this.user = new User(JSON.parse('{}'));

    }

  }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const id = Number.parseInt(params.Id,10);
      this.loadUserDetails(id);
    });
  }
  loadUserDetails(id: number)
  {
    this.loaderService.customLoader('Loading User Details...', 10000);
    this.userService.readById(id,resp => {
      this.user = new User(resp.result[0]);
      this.user.Icon ='person-sharp';
      //this.userService.selectedUser.clear();
      this.loaderService.dismissLoader();
    }, error => {
      this.loaderService.dismissLoader();
    });
  }
  goToUserList()
  {
    this.userService.selectedUser = this.user;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(['home/user-list'], navigationExtras);
  }
  editButtonClicked()
  {
    this.userService.selectedUser = this.user;

    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.userService.selectedUser.id,
        ts: new Date().getMilliseconds()
      }
    };
    this.router.navigate(['home/update-user'], navigationExtras);
  }
}
