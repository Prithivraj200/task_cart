import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.initLoginForm();
    }

    initLoginForm(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.min(3)]]
        });
    }

    submitLogin(): void {
        const { value, valid } = this.loginForm;
        if (!valid) {
            return;
        }
        this.authService.checkLogin(value).subscribe(
            result => {
                const { data, statusCode } = result;
                if (statusCode === 200) {
                    this.authService.setUserInfo(data);
                    this.router.navigate(['/home']);
                    return;
                }
                alert('Invalid username or password');
            },
            () => {
                alert('Invalid username or password');
            }
        );
    }
}
