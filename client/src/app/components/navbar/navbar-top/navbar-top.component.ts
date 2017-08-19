import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.sass']
})
export class NavbarTopComponent {
  closeResult: string;

    constructor(
      private modalService: NgbModal,
      private router: Router,
      private authService: AuthService,
      private flashMessagesService: FlashMessagesService
    ) {}

    open(content) {
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }

    onLogoutClick() {
      this.authService.logout();
      this.flashMessagesService.show('You are now logged out. Thanks for stopping by!', {cssClass:'alert-info'});
      this.router.navigate(['/']);
    }

}
