import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_authentication/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyinfoService } from '../../_services/companyinfo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router,
    private _activatedRoute: ActivatedRoute, private _companyServ: CompanyinfoService) { }

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    userPass: new FormControl('', Validators.required),
    rememberUser: new FormControl()
  });
  error = '';
  userCredentials;
  // redirectURL = this._activatedRoute.snapshot.queryParams['redirectURL'] || ['/'];

  onLogin(f) {
    if (f['rememberUser'] === true) {
      this.userCredentials = f;
      localStorage.setItem('rememberUser', JSON.stringify(this.userCredentials))

    }

    // console.log("submitted from login");
    console.log('this is the form', f['userName'], f['userPass'], f, this.userCredentials);
    // this._authService.isLoggedIn = true;
    this._authService.login(f['userName'], f['userPass']).subscribe
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

  rememberMe(e) {
    console.log(e.target.checked);
    if (e.target.checked) {
      e.target.value = true;
    }
    else {
      e.target.value = false;
    }
  }


  ngOnInit() {
    // console.log('this is the username', this.loginForm.value)
  }

}
