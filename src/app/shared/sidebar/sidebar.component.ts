import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../service/index'

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent {
  public isHide = false
  public myName = "LITIYAN"
  isLoggedIn$: Observable<boolean>;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {

  }

  ngOnInit() {
    this.isLoggedIn$ = this.authenticationService.isLoggedIn; // {2}
  }

  onSelectChannel(channel) {
    console.log(channel)
  }

  toggle() {
    this.isHide = !this.isHide
  }
}
