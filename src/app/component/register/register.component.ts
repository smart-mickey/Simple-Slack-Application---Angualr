import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../../service/index';

@Component({
    selector: 'register',
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
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
        if(this.model.username.length < 6){
            //this.alertService.error('Email is invalid', false)
            this.errorState = 'username'
            return false
        }
        else if(!this.validateEmail(this.model.email)){
            //this.alertService.error('Email is invalid', false)
            this.errorState = 'email'
            return false
        }
        else if(this.model.password.length < 6){
            this.alertService.error('Password must be over 6 in length', false)
            this.errorState = 'password'
            return false
        }
        else if(this.model.password !== this.model.confirm){
            this.errorState = 'confirm'
            return false
        }
        return true
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    register() {
        if(this.checkValidation()){
            this.loading = true;
            this.authenticationService.register(this.model.username, this.model.email, this.model.password)
            .subscribe(res => {
                console.log(res)
                this.loading = false;
                if(res.message == 'exist'){
                    this.alertService.error('The user already exists', false)
                }
                else{
                    this.alertService.success('Welcome, ' + res.message.username, true)
                    this.router.navigate(['chat']);
                }
            });
        }       
    }
}
