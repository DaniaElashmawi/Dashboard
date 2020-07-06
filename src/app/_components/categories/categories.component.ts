import { Component, OnInit, Inject } from '@angular/core';
import { CategoriesService } from '../../_services/categories.service';
import { AuthService } from '../../_authentication/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  index;
  currentServCat;
  currentProjCat;
  sCategories;
  pCategories;
  editIndex;
  nonewCategory = true;
  newImgLabel = "Upload an image ...";
  categoriesTypes = ['service', 'project'];

  newCat = new FormGroup({
    newCatName: new FormControl('', Validators.required),
    newCatDesc: new FormControl('', Validators.required),
    newCatImg: new FormControl('', Validators.required),
    newCatType: new FormControl('', Validators.required)

  });



  openServiceDisplayDialog(i): void {
    console.log('The display dialog was opened');
    this.index = i;
    this.currentServCat = this.sCategories[i];
    console.log(this.currentServCat);
    const dialogRef = this.dialog.open(CatDisplayDialog, {
      width: '880px',
      data: {
        index: this.index, currentServCat: this.currentServCat
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openProjectDisplayDialog(i): void {
    console.log('The P display dialog was opened');
    this.index = i;
    this.currentProjCat = this.pCategories[i];
    console.log(this.currentProjCat);
    const dialogRef = this.dialog.open(CatPDisplayDialog, {
      width: '850px',
      data: {
        index: this.index, currentProjCat: this.currentProjCat
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The P dialog was closed');
    });
  }

  constructor(private _catSer: CategoriesService,
    public dialog: MatDialog,
    private _authSer: AuthService) { console.log('hi from prijects') }

  loadServicesCat() {
    this._catSer.getServicesCat().subscribe(cats => {
      console.log(cats);
      this.sCategories = cats;
      this.sCategories.forEach((cat, i) => {
        this.sCategories[i]['photo_url'] = 'http://127.0.0.1:8000' + cat['photo_url'];
        console.log(this.sCategories[i]['photo_url']);
      });
    });
  }

  loadProjectsCat() {
    this._catSer.getProjectsCat().subscribe(cats => {
      console.log(cats);
      this.pCategories = cats;
      this.pCategories.forEach((cat, i) => {
        this.pCategories[i]['photo_url'] = 'http://127.0.0.1:8000' + cat['photo_url'];
        console.log(this.pCategories[i]['photo_url']);
      });
    });
  }



  openEditDialog(i): void {
    console.log('The edit dialog was opened');
    this.editIndex = i;
    this.currentServCat = this.sCategories[i];

    // console.log(this.editIndex)
    const dialogRef = this.dialog.open(CatEditDialog, {
      width: '800px',
      data: {
        editIndex: this.editIndex, sCategories: this.sCategories
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed', result);

    });
  }


  openPEditDialog(i): void {
    console.log('The p edit dialog was opened');
    this.editIndex = i;
    this.currentProjCat = this.pCategories[i];
    // console.log(this.editIndex)
    const dialogRef = this.dialog.open(CatPEditDialog, {
      width: '800px',
      data: {
        editIndex: this.editIndex, pCategories: this.pCategories
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The p edit dialog was closed', result);

    });
  }


  deleteCat(index) {
    let catID = this.sCategories[index]['id'];
    this._catSer.deleteCAT(catID).subscribe(res => {
      this.sCategories = this.sCategories.filter(item => item['id'] !== catID);
    });
  }

  deletePCat(index) {
    let catID = this.pCategories[index]['id'];
    this._catSer.deleteCAT(catID).subscribe(res => {
      this.pCategories = this.pCategories.filter(item => item['id'] !== catID);
    });
  }


  imgFile = null;
  readFile(file) {
    this.imgFile = file[0];
    if (this.imgFile) {
      this.newImgLabel = this.imgFile.name;
    } else {
      this.newImgLabel = "Upload an image ...";
    }
    console.log(this.imgFile);

  }
  submitNewCat(f) {
    let new_cname = f['newCatName'];
    let new_cdesc = f['newCatDesc'];
    let new_ctype = f['newCatType'];

    let new_cfd = new FormData;
    new_cfd.append('title', new_cname);
    new_cfd.append('category', new_ctype);
    new_cfd.append('description', new_cdesc);
    new_cfd.append('company', this._authSer.currentUserValue['data']['id']);
    new_cfd.append('photo', this.imgFile);

    // console.log(new_simg)

    this._catSer.addNewCategory(new_cfd).subscribe(res => {
      console.log(res);

      for (let key in res) {
        if (key === 'photo_url') {
          res['photo_url'] = 'http://127.0.0.1:8000' + res['photo_url'];
        }
      }
      console.log(res);

      if (new_ctype === 'project') {
        this.pCategories.push(res);
      } else if (new_ctype === 'service') {
        this.sCategories.push(res);
      }
    }
      ,
      err => console.log(err)
    );

    this.newCat.reset();
    this.newImgLabel = "Upload an image ...";
    this.nonewCategory = !this.nonewCategory;


  }
  reset() {
    this.newCat.reset();
    this.newImgLabel = "Upload an image ...";
    this.nonewCategory = !this.nonewCategory;

  }

  ngOnInit() {
    this.loadServicesCat();
    this.loadProjectsCat();

  }

}





@Component({
  selector: 'cat-edit-dialog',
  templateUrl: 'cat-edit-dialog.html',
  styleUrls: ['./categories.component.css']

})

export class CatEditDialog {

  constructor(public dialogRef: MatDialogRef<CatEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _catServ: CategoriesService) { }


  editCat = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    photo_url: new FormControl(''),

  });


  newImgLabel = 'Upload an image ...';

  imgFile = null;
  readFile(file) {
    this.imgFile = file[0];
    if (this.imgFile) {
      this.newImgLabel = this.imgFile.name;
    } else {
      this.newImgLabel = "Upload an image ...";
    }
    console.log(this.imgFile);

  }


  editCatSubmit(f) {
    let catID = this.data.sCategories[this.data.editIndex]['id'];
    let catType = this.data.sCategories[this.data.editIndex]['category'];
    let edit_cf = new FormData();

    for (let key in f) {
      if (f[key] && key !== 'photo_url') {
        edit_cf.append(`${key}`, f[key]);
        console.log(key, f[key]);
      } else if (f[key] && key === 'photo_url') {
        edit_cf.append('photo', this.imgFile);
        console.log(key, f[key]);
      }
    }
    console.log(this.data.sCategories[this.data.editIndex], catID);

    edit_cf.append('_method', 'put');
    edit_cf.append('category', catType);
    this._catServ.editCategory(catID, edit_cf).subscribe(res => {
      console.log(res);
      this.data.sCategories[this.data.editIndex] = res;
      if (res['photo_url']) {
        this.data.sCategories[this.data.editIndex]['photo_url'] = 'http://127.0.0.1:8000' + res['photo_url'];
      }

    });
    // this.dialogRef.close({ event: 'close', receivedData: f });
    this.editCat.reset();
  }


}



@Component({
  selector: 'cat-p-edit-dialog',
  templateUrl: 'cat-p-edit-dialog.html',
  styleUrls: ['./categories.component.css']

})
export class CatPEditDialog {

  constructor(public dialogRef: MatDialogRef<CatPEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _catServ: CategoriesService) { }


  editPCat = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    photo_url: new FormControl(''),

  });


  newImgLabel = 'Upload an image ...';

  imgFile = null;
  readFile(file) {
    this.imgFile = file[0];
    if (this.imgFile) {
      this.newImgLabel = this.imgFile.name;
    } else {
      this.newImgLabel = "Upload an image ...";
    }
    console.log(this.imgFile);

  }


  editCatPSubmit(f) {
    let catID = this.data.pCategories[this.data.editIndex]['id'];
    let catType = this.data.pCategories[this.data.editIndex]['category'];
    console.log(this.data.pCategories[this.data.editIndex], catID);

    let edit_p_cf = new FormData();

    for (let key in f) {
      if (f[key] && key !== 'photo_url') {
        edit_p_cf.append(`${key}`, f[key]);
        console.log(key, f[key]);
      } else if (f[key] && key === 'photo_url') {
        edit_p_cf.append('photo', this.imgFile);
        console.log(key, f[key]);
      }
    }

    edit_p_cf.append('_method', 'put');
    edit_p_cf.append('category', catType);

    console.log(catType);

    this._catServ.editCategory(catID, edit_p_cf).subscribe(res => {
      console.log(res);
      this.data.pCategories[this.data.editIndex] = res;
      if (res['photo_url']) {
        this.data.pCategories[this.data.editIndex]['photo_url'] = 'http://127.0.0.1:8000' + res['photo_url'];
      }
    });
    this.editPCat.reset();
  }




}




@Component({
  selector: 'cat-display-dialog',
  templateUrl: 'cat-display-dialog.html',
  styleUrls: ['./categories.component.css']

})
export class CatDisplayDialog {


  constructor(public dialogRef: MatDialogRef<CatDisplayDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _catServ: CategoriesService) { }



}




@Component({
  selector: 'cat-p-display-dialog',
  templateUrl: 'cat-p-display-dialog.html',
  styleUrls: ['./categories.component.css']

})
export class CatPDisplayDialog {


  constructor(public dialogRef: MatDialogRef<CatPDisplayDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _catServ: CategoriesService) { }



}
