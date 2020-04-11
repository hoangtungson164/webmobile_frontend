import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataStorageService} from '../../storage/data-storage.service';
import {MustMatch} from '../../validators/mustMatch';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from './service/user-service.service';
import {ICheckPhone} from './interface/ICheckPhone';
import {DatePipe} from '@angular/common';
import {IFormUpdateScrapLog} from './interface/IFormUpdateScrapLog';
import {IBankSelected} from '../bank-list/interface/IBankSelected';
import {IFormRqCheckNiceSs} from './interface/IFormRqCheckNiceSs';
import {IFormCheckPhoneAndCust} from './interface/IFormCheckPhoneAndCust';
import {IResultCheckNiceSS} from './interface/IResultCheckNiceSS';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

    id: number;

    loginForm: FormGroup;

    check = false;

    report: string;
    LANGUAGE: string;
    messageCheckPhone: string;
    banksChoose: IBankSelected;
    listCheckPhoneAndCustCdDone: ICheckPhone[];
    listValidNiceSS: IResultCheckNiceSS[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dataStorageService: DataStorageService,
        private fb: FormBuilder,
        private translate: TranslateService,
        private userService: UserService,
        private datePipe: DatePipe
    ) {
        this.LANGUAGE = this.dataStorageService.getLanguage();
        this.banksChoose = this.dataStorageService.getInstitution();
        if (this.LANGUAGE) {
            this.translate.use(this.LANGUAGE);
        }
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
                username: ['', [Validators.required]],
                password: ['', [Validators.required]],
                confirmPassword: ['', [Validators.required]]
            }, {
            validator: MustMatch('password', 'confirmPassword')
        });
        this.report = this.dataStorageService.getReportName();
    }

    checkBox() {
        this.check = !this.check;
    }

    get f() {
        return this.loginForm.controls;
    }

    // ------------------------store after click next button ----------------------------------------------
    async checkNumberPhone() {
        return new Promise((resolve, reject) => {
            const now = new Date();
            const timeStamp = this.datePipe.transform( now, 'yyyyMMddHHmmss');
            const {value} = this.loginForm;
            this.dataStorageService.saveUserId(value.username);
            this.dataStorageService.savePassword(btoa(timeStamp + value.password));
            this.messageCheckPhone = null;
            if (this.dataStorageService.getPhone()) {
                console.log('listCustCD :' ,this.banksChoose.bankInfo );
                const form: IFormCheckPhoneAndCust = {
                    lisCustCD: this.banksChoose.bankInfo,
                    phoneNumber: this.dataStorageService.getPhone()
                };
                this.userService.getNiceSsId(form).subscribe(
                        result => {
                            this.listCheckPhoneAndCustCdDone = result;
                            return resolve(true);
                        }, error => {
                            this.messageCheckPhone = error.message;
                        }
                    );
            }
        });
    }

    async checkValidNiceSS(buttonOpenMessageCheckPhone: HTMLButtonElement, modalNotifyFinishProcess: HTMLButtonElement, modalNotifyOutOfTimelogin: HTMLButtonElement) {
         this.listCheckPhoneAndCustCdDone = null;
         const listNiceSs: string[] = [];
         this.checkNumberPhone().then(res => {
             if (res) {
                 if (this.listCheckPhoneAndCustCdDone[0]) {
                     console.log('listCheckPhoneAndCustCdDone:', this.listCheckPhoneAndCustCdDone);
                     this.listCheckPhoneAndCustCdDone.forEach( function(value) {
                         listNiceSs.push(value.NICE_SSIN_ID);
                     });
                     const form: IFormRqCheckNiceSs = {
                         listNiceSskey: listNiceSs
                     };
                     console.log('form: ' + form.listNiceSskey);
                     this.userService.CheckNiceSsKeyValidToUpdate(form).subscribe(
                         result => {
                             if (result[0]) {
                                 this.listValidNiceSS = result;
                                 this.dataStorageService.saveListNiceSsKey(this.listValidNiceSS);
                                 console.log('listValidNicess =>>: ' + this.listValidNiceSS[0] , this.listValidNiceSS[1]  );
                                 this.router.navigateByUrl('/banks/inquiryReport');
                                 console.log('listValidNicess in store: ', this.dataStorageService.getListNiceSsKey());
                             } else {
                                this.userService.getRspCodeAndTryCountAfterUpdateIDPW(form).subscribe(
                                     next => {
                                         if ( next[0].TRY_COUNT >= 13 && next[0].RSP_CD != 'P000' ) {
                                             modalNotifyOutOfTimelogin.click();
                                             console.log('aaaa');
                                         } else if (next[0].RSP_CD === 'P000') {
                                             modalNotifyFinishProcess.click();
                                         }
                                     }
                                 );
                             }
                         }
                     );
                 }  else {
                     buttonOpenMessageCheckPhone.click();
                 }
             } else {
                 console.log('res is false');
             }
        });
    }

    // sendDataUpdateScrapLog(data: ICheckPhone, buttonOpenMessageCheckPhone: HTMLButtonElement) {
    //     const {value} = this.loginForm;
    //     const now = new Date();
    //     const timeStamp = this.datePipe.transform( now, 'yyyyMMddHHmmss');
    //     if (value.username && value.password) {
    //         const form: IFormUpdateScrapLog = {
    //             niceSsKey: data.data[0].NICE_SSIN_ID,
    //             loginID: value.username,
    //             loginPW: btoa(timeStamp + value.password)
    //         };
    //
    //         console.log(form);
    //         this.userService.updateIdPwScrapLog(form).subscribe(
    //             result => {
    //                 if (result.rowsAffected == 1) {
    //                     this.dataStorageService.saveUserId(value.username);
    //                     this.dataStorageService.savePassword(value.password);
    //                     this.router.navigateByUrl('/banks/' + this.id + '/inquiryReport');
    //                 } else {
    //                     this.messageCheckPhone = 'Error When Update Scraplog/ Lỗi cập nhật thông tin trên Scraplog';
    //                     buttonOpenMessageCheckPhone.click();
    //                 }
    //             }, error => {
    //                 this.messageCheckPhone = 'Error When Update Scraplog/ Lỗi cập nhật thông tin trên Scraplog';
    //                 buttonOpenMessageCheckPhone.click();
    //             }
    //         );
    //     }
    // }
    clearAllData() {
        this.dataStorageService.clear();
        this.router.navigateByUrl('/banks');
    }
}
