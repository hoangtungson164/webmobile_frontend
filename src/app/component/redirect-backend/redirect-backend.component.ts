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
    // window.location.href = 'https://192.168.22.179:3400/';
    // window.location.href = 'https://localhost:3200/';
    window.location.href = 'https://103.112.124.153:3200/';
  }

}
