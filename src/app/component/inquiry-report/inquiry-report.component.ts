import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../../storage/data-storage.service';
import { IInfo } from '../information/interface/i-info';
import { IndiService } from '../information/service/indi.service';
import { UserService } from '../login/service/user-service.service';
import { IUser } from '../login/interface/i-user';
import { TranslateService } from '@ngx-translate/core';
import { IFormUpdateScrapLog } from '../login/interface/IFormUpdateScrapLog';
import { IResultCheckNiceSS } from '../login/interface/IResultCheckNiceSS';
import { IFormRqCheckNiceSs } from '../login/interface/IFormRqCheckNiceSs';
import { environment } from '../../../environments/environment.prod';
import { SocketService } from 'src/app/shared/service/soket.service';

const evi = environment;
@Component({
    selector: 'app-report',
    templateUrl: './inquiry-report.component.html',
    styleUrls: ['./inquiry-report.component.css'],
    encapsulation: ViewEncapsulation.None,
})

export class InquiryReportComponent implements OnInit {

    id: string;
    report: string;
    result: string;
    check = false;
    info: IInfo;
    user: IUser;
    LANGUAGE: string;
    listValidNiceSS: IResultCheckNiceSS[];
    listNice: string[] = [];
    isSubmit: boolean;
    circumference = 2 * Math.PI * 47;
    strokeDashoffset = 12;
    color = '#0000ff';
    value = 0;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private dataStorageService: DataStorageService,
        private infoService: IndiService,
        private router: Router,
        private translate: TranslateService,
        private socketService: SocketService,
    ) {
        this.listValidNiceSS = this.dataStorageService.getListNiceSsKey();
        this.LANGUAGE = this.dataStorageService.getLanguage();
        if (this.LANGUAGE) {
            this.translate.use(this.LANGUAGE);
        }
    }

    ngOnInit() {
        this.isSubmit = false;
        this.report = this.dataStorageService.getReportName();
        this.checkDone();
    }

    onPercentageChanged(val: number) {
        const offset = this.circumference - val / 100 * this.circumference;
        this.strokeDashoffset = offset;
    }

    runPercent() {
        const myInterval = setInterval(() => {
            if (this.value >= 99) {
                clearInterval(myInterval);
            } else {
                this.value++;
                this.onPercentageChanged(this.value);
            }
        }, 200);
    }

    checkDone() {
        if (this.dataStorageService.getUserId()
            && this.dataStorageService.getName()
            && this.dataStorageService.getNationalId()
            && this.dataStorageService.getPassword()
            && this.dataStorageService.getListNiceSsKey()) {
            this.result = 'Done';
        } else {
            this.result = 'Fail';
        }
    }

    checkToSubmit() {
        return this.check && this.result === 'Done' || this.check && this.result === 'Hoàn Thành';
    }

    onSubmit(modalNotify: HTMLButtonElement, modalNotifyLoginFail: HTMLButtonElement, modalCanNotAccess: HTMLButtonElement) {
        this.updateLoginIdAndLoginPwAndNationId(modalNotify, modalNotifyLoginFail, modalCanNotAccess);
    }

    updateLoginIdAndLoginPwAndNationId(modalNotify: HTMLButtonElement, modalNotifyLoginFail: HTMLButtonElement, modalCanNotAccess: HTMLButtonElement) {
        if (this.dataStorageService.getUserId()
            && this.dataStorageService.getNationalId()
            && this.dataStorageService.getPassword()
            && this.dataStorageService.getListNiceSsKey()) {
            this.isSubmit = true;
            this.runPercent();
            const NationalId = this.dataStorageService.getNationalId();
            const password = this.dataStorageService.getPassword();
            const userId = this.dataStorageService.getUserId();
            for (let index = 0; index < this.listValidNiceSS.length; index++) {
                this.listNice.push(this.listValidNiceSS[index].NICE_SSIN_ID);
                const form: IFormUpdateScrapLog = {
                    niceSsKey: this.listValidNiceSS[index].NICE_SSIN_ID,
                    loginID: userId,
                    loginPW: password,
                    nationID: NationalId,
                    rspCode: this.listValidNiceSS[index].RSP_CD,
                    tryCount: this.listValidNiceSS[index].TRY_COUNT,
                    scrapModCd: this.listValidNiceSS[index].SCRP_MOD_CD
                };
                this.userService.updateIdPwNationIDToScrapLog(form).subscribe();
                if (index + 1 === this.listValidNiceSS.length) {
                    this.checkRspCodeAndTryCountAfterUpdateIDPW(this.listNice, modalNotifyLoginFail, modalNotify, modalCanNotAccess);
                }
            }
        }
    }

    checkRspCodeAndTryCountAfterUpdateIDPW(listNice: string[], modalNotifyLoginFail: HTMLButtonElement, modalNotify: HTMLButtonElement, modalCanNotAccess: HTMLButtonElement) {
        const service = this.userService;
        const localStorageSV = this.dataStorageService;
        const form: IFormRqCheckNiceSs = {
            listNiceSskey: listNice
        };
        // this.socketService.getA0001Messages().subscribe((message: boolean) => {
        //     if (message = true) {
        //         service.getRspCodeAndTryCountAfterUpdateIDPW(form).subscribe(
        //             result => {
        //                 if (result[0]) {
        //                     for (let index = 0; index < result.length; index++) {
        //                         if ((result[index].RSP_CD == 'F028' || !result[index].RSP_CD) && result[index].TRY_COUNT <= 12) {
        //                             return modalNotifyLoginFail.click();
        //                         } else if (result[index].RSP_CD == 'P000') {
        //                             return modalNotify.click();
        //                         } else {
        //                             return modalCanNotAccess.click();
        //                         }
        //
        //                     }
        //                 }
        //             }
        //         );
        //     }
        // });
        setTimeout(function () {
            service.getRspCodeAndTryCountAfterUpdateIDPW(form).subscribe(
                result => {
                    if (result[0]) {
                        for (let index = 0; index < result.length; index++) {
                            if ((result[index].RSP_CD == 'F028' || !result[index].RSP_CD) && result[index].TRY_COUNT <= 12) {
                                return modalNotifyLoginFail.click();
                            } else if (result[index].RSP_CD == 'P000') {
                                return modalNotify.click();
                            } else {
                                return modalCanNotAccess.click();
                            }

                        }
                    }
                }
            );
        }, evi.WaitTime);
    }

    setValueWhenDoneWait() {
        this.value = 100;
        this.onPercentageChanged(this.value);
    }
    // localStorageSV.saveListNiceSsKey(result);
    // console.log('listSSafterUpdateIDPW: ' + localStorageSV.getListNiceSsKey());
    // ------------------ save individual info to database--------------------------------------
    // saveInfo() {
    //     this.info = new IInfo(
    //         this.dataStorageService.getInstitution(),
    //         this.dataStorageService.getName(),
    //         this.dataStorageService.getNationalId());
    //
    //     this.infoService.postINQ(this.info).subscribe(next => {
    //         console.log(this.info);
    //         console.log(next);
    //         console.log('success to store into inqlog');
    //     }, error => {
    //         console.log('fail to store into inqlog');
    //     });
    //
    //     this.infoService.postSCRP(this.info).subscribe(next => {
    //         console.log(next);
    //         console.log('success to store into scrplog');
    //     }, error => {
    //         console.log('fail to store into scrplog');
    //     });
    // }
    //
    // saveUser() {
    //     this.user = new IUser(this.dataStorageService.getUserId(),
    //         this.dataStorageService.getPassword(),
    //         this.dataStorageService.getInstitution());
    //     this.userService.insertUser(this.user).subscribe(next => {
    //         console.log('success to insert user');
    //     }, error => {
    //         console.log('fail to insert user');
    //     });
    // }

    clearAllData() {
        this.dataStorageService.clear();
        this.router.navigateByUrl('/banks');
    }
}
