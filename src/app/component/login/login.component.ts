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
    listNiceSS: string[] = [];

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
                username: ['', [Validators.required, Validators.minLength(2)]],
                password: ['', [Validators.required, Validators.minLength(5)]],
                confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
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
                for (let index = 0; index < this.banksChoose.bankInfo.length; ++index) {
                    if (index + 1 === this.banksChoose.bankInfo.length) {
                        resolve(true);
                    }
                    this.userService.getNiceSsId(this.dataStorageService.getPhone(), this.banksChoose.bankInfo[index].CUST_CD).subscribe(
                        result => {
                            if (result.data[0]) {
                                this.listNiceSS.push(result.data[0].NICE_SSIN_ID);
                            }
                        }, error => {
                            this.messageCheckPhone = error.message;
                        }
                    );
                }
            }
        });
    }

    async checkValidNiceSS(buttonOpenMessageCheckPhone: HTMLButtonElement) {
        await this.checkNumberPhone().then(res => {
            console.log('ress', res);
            console.log('list', this.listNiceSS);
            if (res) {
                if (this.listNiceSS) {
                    const form: IFormRqCheckNiceSs = {
                        listNiceSskey: this.listNiceSS
                    };
                    console.log(form);
                    this.userService.CheckNiceSsKeyValidToUpdate(form).subscribe();
                } else {
                    console.log(this.listNiceSS);
                    // buttonOpenMessageCheckPhone.click();
                }
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
}
