import { Component, OnInit, Inject } from '@angular/core';
import { CategoriesService } from '../../_services/categories.service';
import { AuthService } from '../../_authentication/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface CatEditData {
  editIndex;
  sCats;
}

export interface CatPEditData {
  editIndex;
  pCats;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  sCategories;
  pCategories;
  editIndex;
  nonewCategory = true;
  newImgLabel = "Upload an image ...";
  categoriesTypes = ['service', 'project']

  newCat = new FormGroup({
    newCatName: new FormControl('', Validators.required),
    newCatDesc: new FormControl('', Validators.required),
    newCatImg: new FormControl('', Validators.required),
    newCatType: new FormControl('', Validators.required)

  });



  constructor(private _catSer: CategoriesService,
    public dialog: MatDialog,
    private _authSer: AuthService) { }

  loadServicesCat() {
    this._catSer.getServicesCat().subscribe(cats => {
      console.log(cats);
      this.sCategories = cats;
    });
  }
  loadProjectsCat() {
    this._catSer.getProjectsCat().subscribe(cats => {
      console.log(cats);
      this.pCategories = cats;
    });
  }


  open(scat) {
    scat.active = !scat.active;
  }


  openEditDialog(i): void {
    console.log('The edit dialog was opened');
    this.editIndex = i;
    // console.log(this.editIndex)
    const dialogRef = this.dialog.open(CatEditDialog, {
      width: '600px',
      data: {
        editIndex: this.editIndex, sCats: this.sCategories
      }
    });
  }
  openPEditDialog(i): void {
    console.log('The p edit dialog was opened');
    this.editIndex = i;
    // console.log(this.editIndex)
    const dialogRef = this.dialog.open(CatPEditDialog, {
      width: '600px',
      data: {
        editIndex: this.editIndex, pCats: this.pCategories
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The p edit dialog was closed');
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
    }
    else {
      this.newImgLabel = "Upload an image ...";
    }
    console.log(this.imgFile);

  }
  submitNewCat(f) {
    let new_cname = f['newCatName'];
    let new_cdesc = f['newCatDesc'];
    let new_ctype = f['newCatType']

    let new_cfd = new FormData;
    new_cfd.append('title', new_cname);
    new_cfd.append('category', new_ctype);
    new_cfd.append('description', new_cdesc);
    new_cfd.append('company', this._authSer.currentUserValue['data']['id']);
    new_cfd.append('photo', this.imgFile);

    // console.log(new_simg)

    this._catSer.addNewCategory(new_cfd).subscribe(res => {
      console.log(res);
      if (new_ctype === 'project') {
        this.pCategories.push(res);
      }
      else if (new_ctype === 'service') {
        this.sCategories.push(res);
      }
    }
      ,
      err => console.log(err)
    );

    this.newCat.reset();
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
    @Inject(MAT_DIALOG_DATA) public data: CatEditData,
    private _catServ: CategoriesService) { }


  editCat = new FormGroup({
    title: new FormControl(''),
    discription: new FormControl('')
    // catImg: new FormControl('', Validators.required)

  });


  editCatSubmit(f) {
    let catID = this.data.sCats[this.data.editIndex]['id'];
    let catType = this.data.sCats[this.data.editIndex]['category'];
    let edit_cf = new FormData();

    for (let key in f) {
      if (f[key]) {
        edit_cf.append(`${key}`, f[key]);
        console.log(key, f[key]);
      }
    }
    console.log(this.data.sCats[this.data.editIndex], catID);

    edit_cf.append('_method', 'put');
    edit_cf.append('category', catType);
    this._catServ.editCategory(catID, edit_cf).subscribe(res => {
      console.log(res);

    });
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
    @Inject(MAT_DIALOG_DATA) public data: CatPEditData,
    private _catServ: CategoriesService) { }


  editPCat = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
    // catImg: new FormControl('', Validators.required)

  });



  editCatPSubmit(f) {
    let catID = this.data.pCats[this.data.editIndex]['id'];
    let catType = this.data.pCats[this.data.editIndex]['category'];
    console.log(this.data.pCats[this.data.editIndex], catID);

    let edit_p_cf = new FormData();

    for (let key in f) {
      if (f[key]) {
        edit_p_cf.append(`${key}`, f[key]);
        console.log(key, f[key]);
      }
    }

    edit_p_cf.append('_method', 'put');
    edit_p_cf.append('category', catType);

    console.log(catType);

    this._catServ.editCategory(catID, edit_p_cf).subscribe(res => {
      console.log(res);

    });
    this.editPCat.reset();
  }




}
