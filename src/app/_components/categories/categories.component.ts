import { Component, OnInit, Inject } from '@angular/core';
import { CategoriesService } from '../../_services/categories.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface CatEditData {
  editIndex;
  sCats;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  sCategories;
  sCatIsOpen = false;
  pCatIsOpen = false;
  pCategories;
  editIndex;

  constructor(private _catSer: CategoriesService, public dialog: MatDialog) { }

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

    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed');
    });
  }



  deleteCat(index) {
    let catID = this.sCategories[index]['id'];
    this._catSer.deleteSCAT(catID).subscribe(res => {
      this.sCategories = this.sCategories.filter(item => item['id'] !== catID);
    });
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
    catName: new FormControl(''),
    catDesc: new FormControl('')
    // catImg: new FormControl('', Validators.required)

  });


  editCatSubmit(f) {
    let catID = this.data.sCats[this.data.editIndex]['id'];
    let catType = this.data.sCats[this.data.editIndex]['category'];
    console.log(this.data.sCats[this.data.editIndex], catID);
    let edit_cf = new FormData();
    edit_cf.append('title', f['catName']);
    edit_cf.append('description', f['catDesc']);
    edit_cf.append('_method', 'put');
    edit_cf.append('category', catType);
    this._catServ.editCategory(catID, edit_cf).subscribe(res => {
      console.log(res);

    });
  }
}
