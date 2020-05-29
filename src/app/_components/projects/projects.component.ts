import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../_services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any = [];
  isOpen: boolean = false;
  index;
  constructor(public _projects: ProjectsService) { }



  loadAllProjects() {
    return this._projects.getAllProjects().subscribe((res: {}) => {
      this.projects = res['data'];
      console.log(this.projects);
    });
  }
  popup(i) {
    this.index = i;
    this.isOpen = !this.isOpen;
  }

  ngOnInit() {
    this.loadAllProjects();
  }

}
