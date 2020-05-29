import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  opened: boolean;
  userData;

  constructor(public _userService: UserService) {
    this.userData = _userService.getUser();
  }

  ngOnInit() {
  }

}
