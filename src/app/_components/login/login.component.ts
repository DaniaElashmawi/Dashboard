import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_authentication/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    userPass: new FormControl('', Validators.required)
  });
  error = '';
  // redirectURL = this._activatedRoute.snapshot.queryParams['redirectURL'] || ['/'];

  onLogin() {
    // console.log("submitted from login");
    // console.log('this is the username', this.loginForm.value)
    // this._authService.isLoggedIn = true;
    this._authService.login
      (this.loginForm.controls.userName.value, this.loginForm.controls.userPass.value).subscribe
      (data => {
        //   console.log('this is the username', this.loginForm.value)
        // console.log('this is the user id ', this.id);

      },
        error => {
          // console.log('this is the username', this.loginForm.value)
          this.error = error['error'].error;
          // console.log('error');
        });

    // let redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL');
    // if(redirectURL)
    // {
    // this._router.navigate([redirectURL]);
    // }

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

  }


  ngOnInit() {
    // console.log('this is the username', this.loginForm.value)
  }

}
