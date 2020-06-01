import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_authentication/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();

  bgColor: boolean;
  currenUserData: any;

  // whitelogo: string = "../../../assets/white.png";
  // blacklogo: string = "../../../assets/black.png";


  togglevalue() {
    this.toggleSidebar.emit();
    this.bgColor = !this.bgColor;
  }

  constructor(private _authService: AuthService, private _router: Router) { }

  onLogOut() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

  ngOnInit() {
    //   console.log(this.currenUserData);

    //   this._userService.getUser().subscribe(data => {
    //     this.currenUserData = data["data"];
    //   });
    //   console.log(this.currenUserData);
    this.currenUserData = this._authService.currentUserValue['data'];
    // console.log(this.currenUserData)
  }

}
