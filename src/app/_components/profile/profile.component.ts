import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyinfoService } from '../../_services/companyinfo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private _CompanyinfoService: CompanyinfoService) { }

  currentCompanyInfo;
  profileHiddin: boolean = false;

  profileForm = new FormGroup({
    company_name: new FormControl(''),
    company_owner: new FormControl(''),
    company_description: new FormControl(''),
    telephone: new FormControl(''),
    company_type: new FormControl(''),
    companyEmail: new FormControl(''),
    packageSubs: new FormControl(''),
    companyAddress: new FormControl(''),
  });


  loadCompanyInfo() {
    return this._CompanyinfoService.getCompanyInfo().subscribe(info => {
      this.currentCompanyInfo = info[0];
      console.log(this.currentCompanyInfo);
    });

  }


  profileEdit() {
    // console.log("hello from edit");
    this.profileHiddin = true;
  }

  onSubmit(f) {
    let id = this.currentCompanyInfo['id'];
    console.log(id)
    let profile_fd = new FormData();

    for (let key in f) {
      if (f[key]) {
        profile_fd.append(`${key}`, f[key]);
        console.log(key, f[key]);
      }
    }
    profile_fd.append('_method', 'put');

    this._CompanyinfoService.editProfile(profile_fd, id).subscribe(res => {
      console.log(res);
      for (let key in res) {
        this.currentCompanyInfo[key] = res[key];
      }

    },
      err => {
        console.log(err);
      });

    this.profileForm.reset();
    this.profileHiddin = false;
  }

  deleteProfile() {
    let id = this.currentCompanyInfo['id'];
    this._CompanyinfoService.deleteProfile(id).subscribe(res =>
      console.log(res))

  }


  ngOnInit() {
    this.loadCompanyInfo();
  }

}
