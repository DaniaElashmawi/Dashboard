import { Component, OnInit, Inject } from '@angular/core';
import { ProjectsService } from '../../_services/projects.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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

  projects;
  proj: boolean = false;
  projectsDetails;
  index: number;
  // isOpen: boolean = false;
  editindex: number;
  currentProject;


  constructor(public dialog: MatDialog, public _projectsService: ProjectsService) { }

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
    });
  }

  loadprojects(i) {
    let projectCatId = this.projects[i]['id'];
    console.log(projectCatId);
    return this._projectsService.getAllProjects(projectCatId).subscribe(proj => {
      this.projectsDetails = proj;
      console.log(this.projectsDetails);
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
    projectName: new FormControl('', Validators.required),
    projectDesc: new FormControl('', Validators.required),
    projectCategory: new FormControl('', Validators.required)

  });

  constructor(
    public dialogRef: MatDialogRef<editDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData,
    private _projectsService: ProjectsService) { }



  editProject() {
    let pname = this.editForm.get('projectName').value;
    let pdesc = this.editForm.get('projectDesc').value;
    let pcat = this.editForm.get('projectCategory').value;

    const fd = new FormData();
    console.log(this.editForm.value);
    // fd.append('data', formdata);
    fd.append('title', pname);
    fd.append('description', pdesc);
    // fd.append('',pcat)
    fd.append('_method', 'put');
    // console.log(fd);

    let id = this.data.projectsDetails[this.data.editindex]['id'];
    // console.log(this.data.projectsDetails[this.data.editindex], id);


    this._projectsService.editProject(id, this.editForm.value).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log(err);
      }
    );


  }





}
