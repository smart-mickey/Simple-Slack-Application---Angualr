import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../../service/index';
import { HeaderComponent } from '../../shared/header/header.component'
import { SideBarComponent } from '../../shared/sidebar/sidebar.component'

@Component({
    selector: 'chat-screen',
    moduleId: module.id,
    templateUrl: 'chat.component.html',
    styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    @Input() header: HeaderComponent;
    @Input() sideBar: SideBarComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
      ) { }

    ngOnInit() {
        // reset login status
    }

    
}
