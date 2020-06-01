import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor() { }
  isMenuOpen = false;
  currentUserData;
  togglingSidebar() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  ngOnInit() {
  }



}
