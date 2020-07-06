import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyinfoService } from '../../_services/companyinfo.service';
import { AuthService } from '../../_authentication/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  private delteVarSubject: BehaviorSubject<boolean>;

  constructor(private _CompanyinfoService: CompanyinfoService, private _auth: AuthService) {
    this.delteVarSubject = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('deleteVariable')));
    this.delteVarSubject.subscribe(res => this.deleteVar = res);
    console.log('this is the deleteVar from constructor', this.deleteVar);

  }


  currentCompanyInfo;
  profileHiddin: boolean = false;
  newImgLabel = 'Upload an image ...';
  imgFile = null;
  deleteVar: boolean;


  profileForm = new FormGroup({
    company_name: new FormControl('', Validators.required),
    company_owner: new FormControl('', Validators.required),
    company_description: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    company_type: new FormControl('', Validators.required),
    companyEmail: new FormControl('', Validators.required),
    packageSubs: new FormControl('', Validators.required),
    companyAddress: new FormControl('', Validators.required),
    company_photo: new FormControl('', Validators.required),
  });


  loadCompanyInfo() {

    console.log(this.deleteVar);
    // console.log('hellooo from loading ');
    this._CompanyinfoService.getCompanyInfo().subscribe(info => {

      console.log('hellooo from service inside loading', info);
      if (info.length > 0) {
        this.currentCompanyInfo = info[0];
        // console.log(info[0], 'hellooo from loding with if == true');
        if (info[0]['company_photo']) {
          this.currentCompanyInfo['company_photo'] = 'http://127.0.0.1:8000' +
            this.currentCompanyInfo['company_photo'];

        }
      }
      else {
        console.log('no data for company info');

      }

    });


  }

  checkForCompanyInfo() {

    this._CompanyinfoService.getCompanyInfo().subscribe(res => {
      console.log('hi from check func.')

      if (res.length > 0) {
        // console.log(res);
        localStorage.setItem('deleteVariable', JSON.stringify(false));
      }
      else {
        localStorage.setItem('deleteVariable', JSON.stringify(true));
      }
    });
  }

  readFile(file) {
    this.imgFile = file[0];
    if (this.imgFile) {
      this.newImgLabel = this.imgFile.name;
    } else {
      this.newImgLabel = 'Upload an image ...';
    }
    // console.log(this.imgFile);

  }

  onSubmit(f) {

    console.log(f);
    let profile_fd = new FormData();

    for (let key in f) {
      if (f[key] && key !== 'company_photo') {
        profile_fd.append(`${key}`, f[key]);
        console.log(key, f[key]);
      }
      else if (f[key] && key === 'company_photo') {
        profile_fd.append(`photo`, this.imgFile);
        console.log(key, f[key]);
      }
    }

    if (this.deleteVar) {
      profile_fd.append('company', this._auth.currentUserValue['data']['id']);
      this._CompanyinfoService.addProfile(profile_fd).subscribe(res => {
        console.log(res);
        this.currentCompanyInfo = res;
        for (let key in this.currentCompanyInfo) {
          if (key === 'company_photo') {
            this.currentCompanyInfo[key] = 'http://127.0.0.1:8000' + this.currentCompanyInfo[key];
            console.log(this.currentCompanyInfo[key]);

          }
        }
      }), err => console.log(err);
      localStorage.setItem('deleteVariable', JSON.stringify(false));
      this.delteVarSubject.next(false);

    } else {
      let id = this.currentCompanyInfo['id'];
      console.log(id);
      profile_fd.append('_method', 'put');
      this._CompanyinfoService.editProfile(profile_fd, id).subscribe(res => {
        console.log(res);
        for (let key in res) {
          this.currentCompanyInfo[key] = res[key];
          if (key === 'company_photo') {
            this.currentCompanyInfo[key] = 'http://127.0.0.1:8000' + res[key];
            console.log(this.currentCompanyInfo[key]);
          }
        }

      },
        err => {
          console.log(err);
        });

    }

    this.newImgLabel = 'Upload an image ...';
    this.profileForm.reset();
    this.profileHiddin = false;
  }

  deleteProfile() {
    let id = this.currentCompanyInfo['id'];
    let body = JSON.stringify(this.currentCompanyInfo);
    this._CompanyinfoService.deleteProfile(body, id).subscribe(res =>
      console.log(res));
    localStorage.setItem('deleteVariable', JSON.stringify(true));
    this.delteVarSubject.next(true);
    console.log(this.deleteVar);

  }


  ngOnInit() {
    this.checkForCompanyInfo();
    this.loadCompanyInfo();
  }
}
