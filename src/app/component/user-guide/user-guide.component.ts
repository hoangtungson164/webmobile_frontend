import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.component.html',
  styleUrls: ['./user-guide.component.css']
})
export class UserGuideComponent implements OnInit {
  isLoading: boolean;


  constructor() {
  }

  ngOnInit() {
    this.startLoad();
  }


  startLoad() {
    this.isLoading = true;
    setTimeout(() => {
      if (!this.isLoading) {
        return;
      } else {
        window.location.reload();
      }
    }, 10000);
  }


  endLoad() {
    this.isLoading = false;
  }
}
