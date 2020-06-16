import { Component, OnInit, Inject, Output, Input, EventEmitter } from '@angular/core';
import { ProjectsService } from '../../_services/projects.service';
import { AuthService } from '../../_authentication/auth.service';
import { CategoriesService } from '../../_services/categories.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface DialogData {
  index: number;
  currentProject;
}


export interface EditDialogData {
  editindex: number;
  projectsDetails;
}


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {



  newProject = new FormGroup({
    newProjectName: new FormControl('', Validators.required),
    newProjectCat: new FormControl('', Validators.required),
    newProjectDesc: new FormControl('', Validators.required),
    newProjectImg: new FormControl('', Validators.required)

  });

  newCat = new FormGroup({
    newCatName: new FormControl('', Validators.required),
    newCatDesc: new FormControl('', Validators.required),
    newCatImg: new FormControl('', Validators.required)

  });

  projects;
  proj: boolean = false;
  projectsDetails;
  index: number;
  editindex: number;
  currentProject;

  newImgLabel = 'Upload an image ...';
  nonewProject: boolean = true;
  nonewCategory: boolean = true;
  pMainCategories = [];

  constructor(public dialog: MatDialog, public _projectsService: ProjectsService,
    private _authSer: AuthService, private _catServ: CategoriesService) { }

  openDialog(i): void {
    console.log('The display dialog was opened');
    this.index = i;
    this.currentProject = this.projectsDetails[i];
    const dialogRef = this.dialog.open(displayDialog, {
      width: '600px',
      data: {
        index: this.index, currentProject: this.currentProject
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  openEditDialog(i): void {
    console.log('The edit dialog was opened');
    this.editindex = i;
    this.currentProject = this.projectsDetails[i];

    const dialogRef = this.dialog.open(editDialog, {
      width: '800px',
      data: {
        editindex: this.editindex, projectsDetails: this.projectsDetails
      }
    });

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;


    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed');
    });
  }



  loadAllProjectsCat() {
    return this._projectsService.getAllProjectsCat().subscribe(data => {
      this.projects = data;
      console.log(data);

      this.projects.forEach((project, i) => {
        this.pMainCategories[i] = project['title'];
      });
    });
  }

  loadprojects(i) {
    let projectCatId = this.projects[i]['id'];
    // console.log(projectCatId);
    return this._projectsService.getAllProjects(projectCatId).subscribe(proj => {
      this.projectsDetails = proj;
      // console.log(this.projectsDetails);
      this.proj = true;
    });

  }

  deleteSingleProject(i) {
    let id = this.projectsDetails[i]['id'];
    // console.log(id)
    this._projectsService.deleteProject(id).subscribe(res => {

      // console.log(this.projects);
      this.projectsDetails = this.projectsDetails.filter(item => item['id'] !== id);

      // console.log(this.projects);

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

  submitNewProject(f) {
    // console.log(f);

    let new_pname = f['newProjectName'];
    let new_pcat = f['newProjectCat'];
    let new_pdesc = f['newProjectDesc'];
    let cat_id;

    for (let x of this.projects) {
      if (x['title'] == new_pcat) {
        cat_id = x['id'];
      }

    }


    let new_pfd = new FormData;
    new_pfd.append('title', new_pname);
    new_pfd.append('category', cat_id);
    new_pfd.append('description', new_pdesc);
    new_pfd.append('company', this._authSer.currentUserValue['data']['id']);
    new_pfd.append('photo', this.imgFile);
    // console.log(new_simg)
    this._projectsService.addNewProject(new_pfd).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log(err);
      });
    this.newProject.reset();
    this.nonewProject = !this.nonewProject;

  }



  submitNewCat(f) {
    let new_cname = f['newCatName'];
    let new_cdesc = f['newCatDesc'];


    let new_cfd = new FormData;
    new_cfd.append('title', new_cname);
    new_cfd.append('category', 'project');
    new_cfd.append('description', new_cdesc);
    new_cfd.append('company', this._authSer.currentUserValue['data']['id']);
    new_cfd.append('photo', this.imgFile);

    // console.log(new_simg)

    this._catServ.addNewCategory(new_cfd).subscribe(res => {
      console.log(res);
      this.projects.push(res);
    }
      ,
      err => console.log(err)
    );

    this.newCat.reset();
    this.nonewCategory = !this.nonewCategory;

  }


  ngOnInit() {
    this.loadAllProjectsCat();

  }

}




@Component({
  selector: 'display-dialog',
  templateUrl: 'display-dialog.html',
  styleUrls: ['./projects.component.css']

})

export class displayDialog {

  constructor(
    public dialogRef: MatDialogRef<displayDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  // onClose(): void {
  //   this.dialogRef.close();
  // }

}


@Component({
  selector: 'edit-dialog',
  templateUrl: 'edit-dialog.html',
  styleUrls: ['./projects.component.css']

})
export class editDialog {

  editForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),

  });



  constructor(
    public dialogRef: MatDialogRef<editDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData,
    private _projectsService: ProjectsService) { }



  editProject(f) {

    console.log(f);
    const fd = new FormData();

    for (let key in f) {
      if (f[key]) {
        fd.append(`${key}`, f[key]);
        console.log(key, f[key]);
      }
    }


    fd.append('_method', 'put');

    let id = this.data.projectsDetails[this.data.editindex]['id'];
    // console.log(this.data.projectsDetails[this.data.editindex], id);

    this._projectsService.editProject(id, fd).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log(err);
      }
    );








  }





}
