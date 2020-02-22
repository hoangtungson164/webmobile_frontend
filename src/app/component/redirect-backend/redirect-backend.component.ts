import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-redirect-backend',
  templateUrl: './redirect-backend.component.html',
  styleUrls: ['./redirect-backend.component.css']
})
export class RedirectBackendComponent implements OnInit {

  constructor(
      private router: Router,

  ) { }

  ngOnInit() {
    window.location.href = 'https://localhost:3400/';
  }

}
