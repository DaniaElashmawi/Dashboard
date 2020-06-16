import { Component, OnInit, Inject, Output, Input, EventEmitter } from '@angular/core';
import { ServicesService } from '../../_services/services.service';
import { AuthService } from '../../_authentication/auth.service';
import { CategoriesService } from '../../_services/categories.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';


export interface DialogData {
  index: number;
  currentService;
}


export interface EditDialogData {
  editindex: number;
  servicesDetails;
}


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {


  newService = new FormGroup({
    newServiceName: new FormControl('', Validators.required),
    newServiceCat: new FormControl('', Validators.required),
    newServiceDesc: new FormControl('', Validators.required),
    newServiceImg: new FormControl('', Validators.required)

  });

  newCat = new FormGroup({
    newCatName: new FormControl('', Validators.required),
    newCatDesc: new FormControl('', Validators.required),
    newCatImg: new FormControl('', Validators.required)

  });

  services;
  serv: boolean = false;
  servicesDetails;
  index: number;
  editindex: number;
  currentService;

  newImgLabel = "Upload an image ...";
  nonewService: boolean = true;
  nonewCategory: boolean = true;
  mainCategories = [];

  constructor(public dialog: MatDialog, public _SerService: ServicesService,
    private _authSer: AuthService, private _catServ: CategoriesService) { }

  openDialog(i): void {
    console.log('The display dialog was opened');
    this.index = i;
    this.currentService = this.servicesDetails[i];
    const dialogRef = this.dialog.open(servicedisplayDialog, {
      width: '600px',
      data: {
        index: this.index, currentService: this.currentService
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  openEditDialog(i): void {
    console.log('The edit dialog was opened');
    this.editindex = i;
    this.currentService = this.services[i];

    const dialogRef = this.dialog.open(serviceeditDialog, {
      width: '800px',
      data: {
        editindex: this.editindex, servicesDetails: this.servicesDetails

      }
    });

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;


    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed');
    });
  }



  loadAllServicesCat() {
    return this._SerService.getAllServicesCat().subscribe(data => {
      this.services = data;

      this.services.forEach((service, i) => {
        this.mainCategories[i] = service['title'];
      });

      // console.log(this.services, this.mainCategories);
    });
  }

  loadservices(i) {
    let serviceCatId = this.services[i]['id'];
    console.log(serviceCatId);
    return this._SerService.getAllServices(serviceCatId).subscribe(serv => {
      this.servicesDetails = serv;
      console.log(this.servicesDetails);
      this.serv = true;
    });


  }

  deleteSingleService(i) {
    let id = this.servicesDetails[i]['id'];
    // console.log(id)
    this._SerService.deleteService(id).subscribe(res => {

      // console.log(this.services);
      this.servicesDetails = this.servicesDetails.filter(item => item['id'] !== id);

      // console.log(this.services);

    });
  }

  imgFile = null;
  readFile(file) {
    this.imgFile = file[0];
    if (this.imgFile) {
      this.newImgLabel = this.imgFile.name;
    }
    else {
      this.newImgLabel = "Upload an image ...";
    }
    console.log(this.imgFile);

  }

  submitNewService(f) {
    // console.log(f);

    let new_sname = f['newServiceName'];
    let new_scat = f['newServiceCat'];
    let new_sdesc = f['newServiceDesc'];
    let cat_id;

    for (let x of this.services) {
      if (x['title'] == new_scat) {
        cat_id = x['id']
      }

    }


    let new_sfd = new FormData;
    new_sfd.append('title', new_sname);
    new_sfd.append('category', cat_id);
    new_sfd.append('description', new_sdesc);
    new_sfd.append('company', this._authSer.currentUserValue['data']['id']);
    new_sfd.append('photo', this.imgFile);
    // console.log(new_simg)
    this._SerService.addNewService(new_sfd).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log(err);
      });
    this.newService.reset();
    this.nonewService = !this.nonewService;

  }




  submitNewCat(f) {
    let new_cname = f['newCatName'];
    let new_cdesc = f['newCatDesc'];


    let new_cfd = new FormData;
    new_cfd.append('title', new_cname);
    new_cfd.append('category', 'service');
    new_cfd.append('description', new_cdesc);
    new_cfd.append('company', this._authSer.currentUserValue['data']['id']);
    new_cfd.append('photo', this.imgFile);

    // console.log(new_simg)

    this._catServ.addNewCategory(new_cfd).subscribe(res => {
      console.log(res);
      this.services.push(res);
    }
      ,
      err => console.log(err)
    );

    this.newCat.reset();
    this.nonewCategory = !this.nonewCategory;

  }


  ngOnInit() {
    this.loadAllServicesCat();
  }

}




@Component({
  selector: 'service-display-dialog',
  templateUrl: 'service-display-dialog.html',
  styleUrls: ['./services.component.css']

})

export class servicedisplayDialog {

  constructor(
    public dialogRef: MatDialogRef<servicedisplayDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  // onClose(): void {
  //   this.dialogRef.close();
  // }

}


@Component({
  selector: 'service-edit-dialog',
  templateUrl: 'service-edit-dialog.html',
  styleUrls: ['./services.component.css']

})
export class serviceeditDialog {



  editServcieForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),

  });

  constructor(
    public dialogRef: MatDialogRef<serviceeditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData,
    private _SerService: ServicesService) { }


  editservice(f) {
    console.log(f);

    const s_fd = new FormData();

    for (let key in f) {
      if (f[key]) {
        s_fd.append(`${key}`, f[key]);
        console.log(key, f[key]);
      }
    }


    s_fd.append('_method', 'put');

    let id = this.data.servicesDetails[this.data.editindex]['id'];
    // console.log(this.data.projectsDetails[this.data.editindex], id);

    this._SerService.editService(id, s_fd).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log(err);
      }
    );
  }










}
