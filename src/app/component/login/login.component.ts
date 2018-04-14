import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../../service/index';


@Component({
    selector: 'login',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LogInComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    errorState: string;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
      ) { }

    ngOnInit() {
        // reset login status
    }

    checkValidation() {
        if(!this.validateEmail(this.model.email)){
            this.errorState = 'email'
            return false
        }
        else if(this.model.password.length < 6){
            this.errorState = 'password'
            return false
        }
        return true
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    login() {
        if(this.checkValidation()){
            this.loading = true;
            this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(res => {
                console.log(res)
                this.loading = false;
                if(res.message == 'error'){
                    this.alertService.error(res.data, false)
                }
                else{
                    this.alertService.success('Welcome, ' + res.message.username, true)
                    this.router.navigate(['chat']);
                }
            });
        }       
    }
}
