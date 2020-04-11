import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment.prod';

const evi = environment;
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
    // window.location.href = evi.serverDEV;
    window.location.href = evi.local;
    // window.location.href = evi.testingSV;
    // window.location.href = evi.prodSV;
  }

}
