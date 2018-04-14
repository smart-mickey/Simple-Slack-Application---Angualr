import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../../service/index';


@Component({
    selector: 'reset',
    moduleId: module.id,
    templateUrl: 'reset.component.html',
    styleUrls: ['./reset.component.scss']
})

export class ResetPasswordComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    errorState: string;
    public barLabel: string = "Password strength:";
    public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
      ) { }

    ngOnInit() {
        // reset login status
    }

    checkContainSpecial(str) {
        var splChars = "*|,\":<>[]{}`\';()@&$#%";
        for (var i = 0; i < str.length; i++) {
            if (splChars.indexOf(str.charAt(i)) != -1) return true
        }
        return false
    }

    checkContainNumber(str) {
        var splChars = "1234567890";
        for (var i = 0; i < str.length; i++) {
            if (splChars.indexOf(str.charAt(i)) != -1) return true
        }
        return false
    }

    checkContainLetter(str) {
        console.log(str)
        var splChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < str.length; i++) {
            if (splChars.indexOf(str.charAt(i)) != -1) return true
        }
        return false
    }

    checkValidation() {
        console.log(this.model.new)
        var pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/);
        if(this.model.old == 0){
            //this.alertService.error('Email is invalid', false)
            this.errorState = 'old'
            return false
        }
        else if(this.model.new.length < 6){
            this.errorState = 'new'
            return false
        }
        else if(!pattern.test(this.model.new)){
            this.errorState = 'new'
            return false
        }
        else if(this.model.confirm !== this.model.new){
            this.errorState = 'confirm'
            return false
        }
        this.errorState = ''
        return true
    }

    scorePassword(pass) {
        var score = 0;
        if (!pass)
            return score;
    
        // award every unique letter until 5 repetitions
        var letters = new Object();
        for (var i=0; i<pass.length; i++) {
            letters[pass[i]] = (letters[pass[i]] || 0) + 1;
            score += 5.0 / letters[pass[i]];
        }
    
        // bonus points for mixing it up
        var variations = {
            digits: /\d/.test(pass),
            lower: /[a-z]/.test(pass),
            upper: /[A-Z]/.test(pass),
            nonWords: /\W/.test(pass),
        }
    
        let variationCount = 0;
        for (var check in variations) {
            variationCount += (variations[check] == true) ? 1 : 0;
        }
        score += (variationCount - 1) * 10;
        console.log('Password Strength ', parseInt(score.toString()))
        return parseInt(score.toString());
    }

    onChangeNewPassword() {
        var score = this.scorePassword(this.model.new);
        var obj = document.getElementById('strength')
        if(score > 100){
            this.model.strength = 'Very strong'            
            obj.style["color"]="blue"
        } else  if (score > 80) {
            this.model.strength = 'Strong'
            obj.style["color"]="green"
        } else  if (score > 60) {
            this.model.strength = 'Good'
            obj.style["color"]="brown"
        } else  if (score > 30) {
            this.model.strength = 'Weak'
            obj.style["color"]="yellow"
        } else {
            this.model.strength = 'Very weak'
            obj.style["color"]="red"
        }
    }

    reset() {
        if(this.checkValidation()){
            this.authenticationService.resetPassword(this.model)
            .subscribe(
                data => {
                    if(data.success) {
                        this.alertService.success('Password has been reset successfully', true)
                    }
                },
                err => {
                    this.alertService.error('Old password is wrong', true)
                },
                () => console.log()
            );
        }       
    }
}
