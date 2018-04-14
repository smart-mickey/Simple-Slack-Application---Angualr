import { Component, OnInit } from '@angular/core';

import { AlertService } from '../../service/index';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['./alert.component.scss']
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}