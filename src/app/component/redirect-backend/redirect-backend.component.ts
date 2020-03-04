import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RedirectBackendService} from "./service/redirect-backend.service";

@Component({
  selector: 'app-redirect-backend',
  templateUrl: './redirect-backend.component.html',
  styleUrls: ['./redirect-backend.component.css']
})
export class RedirectBackendComponent implements OnInit {

  private url: string;

  constructor(
      private router: Router,
      private redirectBackendService: RedirectBackendService,
  ) { }

  ngOnInit() {
    this.url = this.router.url;
    this.redirectBackendService.postBank(this.url).subscribe(next => {
      console.log('nothing');
    }, error => {
      console.log('nothing');
    });
    window.location.href = 'https://localhost:3400/';
  }

}
