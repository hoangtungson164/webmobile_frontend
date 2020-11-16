import {Component, OnInit, ViewChild} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {SendingInfoService} from '../sending-info/service/sending-info.service';
import {BrowserResult} from '../sending-info/interface/browserResult';

@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.component.html',
  styleUrls: ['./user-guide.component.css']
})
export class UserGuideComponent implements OnInit {
  isLoading: boolean;
  userBrowser: BrowserResult;
  arr = ['Chrome', 'Opera', 'UC Browser', 'Microsoft Edge', 'Firefox', 'Chromium', 'Safari'];
  isTrustBrowser: boolean;
  dataLoadPdf: {loaded: any, total: any};
  isShowSuggest = false;

  constructor(private sendingService: SendingInfoService) {
  }

  ngOnInit() {
  }

  detectBrowser() {
    const btn = document.getElementById('modalAlert');
    this.isLoading = true;
    const body = { ua: navigator.userAgent };
    console.log(body);
    this.sendingService.detectBrowser(body).subscribe(
        result => {
          this.userBrowser = result;
          this.isTrustBrowser = this.arr.some(e => e === this.userBrowser.browser.name);
          if (!this.isTrustBrowser) {
            this.startLoad();
            btn.click();
          }
        }, err => {
          this.isTrustBrowser = false;
          this.startLoad();
        }
    );
  }

  startLoad() {
    setTimeout(() => {
      if (this.isLoading) {
        this.isShowSuggest = true;
      }
    }, 30000);
  }

  endLoad() {
    this.isLoading = false;
  }

  onProgress(progressData: any) {
    this.dataLoadPdf = progressData;
    if (this.dataLoadPdf.loaded >= this.dataLoadPdf.total) {
      this.isLoading = false;
    }
  }

  refreshPage() {
    window.location.reload();
  }
}
