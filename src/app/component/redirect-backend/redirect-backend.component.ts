import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-redirect-backend',
  templateUrl: './redirect-backend.component.html',
  styleUrls: ['./redirect-backend.component.css']
})
export class RedirectBackendComponent implements OnInit {

  constructor(
      private router: Router,
      public translate: TranslateService,
  ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    // window.location.href = 'https://localhost:3400/';
  }

}
