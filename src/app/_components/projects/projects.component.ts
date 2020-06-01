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
  constructor(public _projectsService: ProjectsService) { }



  loadAllProjects() {
    return this._projectsService.getAllProjects().subscribe((res) => {
      this.projects = res;
      console.log(res);
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
