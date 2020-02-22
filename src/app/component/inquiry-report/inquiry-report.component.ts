import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataStorageService} from '../../storage/data-storage.service';
import {IInfo} from '../information/interface/i-info';
import {IndiService} from '../information/service/indi.service';
import {UserService} from '../login/service/user-service.service';
import {IUser} from '../login/interface/i-user';

@Component({
    selector: 'app-report',
    templateUrl: './inquiry-report.component.html',
    styleUrls: ['./inquiry-report.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class InquiryReportComponent implements OnInit {

    id: number;
    report: string;
    result: string;
    check = false;
    info: IInfo;
    user: IUser;


    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private dataStorageService: DataStorageService,
        private infoService: IndiService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.report = this.dataStorageService.getReportName();
        this.checkDone();
    }

    checkDone() {
        if (this.dataStorageService.getUserId()
            && this.dataStorageService.getName()
            && this.dataStorageService.getNationalId()
            && this.dataStorageService.getPassword()) {
            this.result = 'Done';
        } else {
            this.result = 'Fail';
        }
    }

    checkToSubmit() {
        return this.check && this.result === 'Done';
    }

    onSubmit() {
        this.saveInfo();
        // this.saveUser();
    }

    // ------------------ save individual info to database--------------------------------------
    saveInfo() {
        this.info = new IInfo(
            this.dataStorageService.getInstitution(),
            this.dataStorageService.getName(),
            this.dataStorageService.getNationalId());
        this.infoService.postIndi(this.info).subscribe(next => {
            console.log(this.info);
            console.log(next);
            console.log('success to store individual');
            alert('success to send the report');
        }, error => {
            console.log('fail to store individual');
        });
    }

    saveUser() {
        this.user = new IUser(this.dataStorageService.getUserId(),
            this.dataStorageService.getPassword(),
            this.dataStorageService.getInstitution());
        this.userService.insertUser(this.user).subscribe(next => {
            console.log('success to insert user');
        }, error => {
            console.log('fail to insert user');
        });
    }

    clearAllData() {
        this.dataStorageService.clear();
        this.router.navigateByUrl('/banks');
    }
}
