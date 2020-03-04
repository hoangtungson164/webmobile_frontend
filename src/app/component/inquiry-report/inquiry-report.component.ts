import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataStorageService} from '../../storage/data-storage.service';
import {IInfo} from '../information/interface/i-info';
import {IndiService} from '../information/service/indi.service';
import {UserService} from '../login/service/user-service.service';
import {IUser} from '../login/interface/i-user';
import {ICic} from './ICic';
import {CicService} from "./service/cic.service";

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
    cic: ICic;


    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private dataStorageService: DataStorageService,
        private infoService: IndiService,
        private router: Router,
        private cicService: CicService,
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
        this.saveUser();
        this.requestCIC();
    }

    // ------------------ save individual info to database--------------------------------------
    saveInfo() {
        this.info = new IInfo(
            this.dataStorageService.getInstitution(),
            this.dataStorageService.getName(),
            this.dataStorageService.getNationalId());

        this.infoService.postINQ(this.info).subscribe(next => {
            console.log(this.info);
            console.log(next);
            console.log('success to store into inqlog');
        }, error => {
            console.log('fail to store into inqlog');
        });

        this.infoService.postSCRP(this.info).subscribe(next => {
            console.log(next);
            console.log('success to store into scrplog');
        }, error => {
            console.log('fail to store into scrplog');
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

    requestCIC() {
        this.cic = new ICic(
            this.dataStorageService.getOrgCd(), // cic.vn
            this.dataStorageService.getInstitution(),
            this.dataStorageService.getSvcCd(), // A0001
            this.dataStorageService.getNationalId(),
            this.dataStorageService.getPassword(),
        );

        this.cicService.postCIC(this.cic).subscribe(next => {
            console.log(next);
            console.log('send request');
        }, error => {
            console.log('fail to send request');
        });
    }
}
