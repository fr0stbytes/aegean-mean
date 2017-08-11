import { Component, OnInit } from '@angular/core';
import { NavbarTopComponent } from './navbar-top/navbar-top.component'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {

  showDialog = false;

  constructor() { }

  ngOnInit() {
  }

}
