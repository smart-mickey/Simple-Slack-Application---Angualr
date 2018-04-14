import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../service/index'
import { SideBarComponent } from '../sidebar/sidebar.component'

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent {
  public isHide = false
  isLoggedIn$: Observable<boolean>;
  @Input() sideBar: SideBarComponent;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {

  }

  ngOnInit() {
    this.isLoggedIn$ = this.authenticationService.isLoggedIn; // {2}
  }

  onLogout() {
    this.authenticationService.logout()
    this.router.navigate(['']);
  }

  onToggleSideBar() {
    this.sideBar.toggle();
  }
}
