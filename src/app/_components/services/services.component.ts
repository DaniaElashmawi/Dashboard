import { Component, OnInit, Inject } from '@angular/core';
import { ServicesService } from '../../_services/services.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

export interface DialogData {
  index: number;
  currentService;
}


export interface EditDialogData {
  index: number;
  services;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  services;
  serv: boolean = false;
  servicesDetails;
  index: number;
  // isOpen: boolean = false;
  editindex: number;
  currentService;


  constructor(public dialog: MatDialog, public _SerService: ServicesService) { }
  o
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
        index: this.editindex, services: this.services
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
      console.log(data);
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
  // editForm = new FormGroup({
  //   projectName: new FormControl('', Validators.required),
  //   projectDesc: new FormControl('', Validators.required),
  //   projectCategory: new FormControl('', Validators.required)

  // });
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<serviceeditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData,
    private _SerService: ServicesService,
    _formBuilder: FormBuilder) {
    this.editForm = _formBuilder.group({
      projectName: [" "],
      projectDesc: [" "],
      projectCategory: []
    });
  }



  // editProject() {
  //   console.log(this.editForm.value);
  //   let pname = this.editForm.get('projectName').value;
  //   console.log(pname);
  //   let id = this.data.services[this.data.index]['id'];
  //   // console.log(this.data.services[this.data.index])
  //   this._SerService.editProject(id, this.editForm.get('projectName').value).subscribe(res => {
  //     console.log(res);
  //   }),
  //     (err => {
  //       console.log(err);
  //     });

  // }


}
