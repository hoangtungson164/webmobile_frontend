import {Component, OnInit} from '@angular/core';
import {BankService} from './service/bank.service';
import {IBank} from './interface/ibank';
import {DataStorageService} from '../../storage/data-storage.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IBankSelected} from './interface/IBankSelected';

@Component({
    selector: 'app-bank-list',
    templateUrl: './bank-list.component.html',
    styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit {
    banks: IBank[];
    bankId: string;
    inputLanguage: string;
    displayLanguage: string;
    LANGUAGE: string;
    isShowButtonChooseLanguage = false;
    phoneURL: string;
    custCD: string;
    getPhoneUrl: string;
    myFormChooseListBank: FormGroup;
    selectedBank: IBankSelected;

    constructor(
        private bankService: BankService,
        private dataStorageService: DataStorageService,
        public translate: TranslateService,
        private storageLocal: DataStorageService,
        private route: ActivatedRoute,
        private _router: Router,
        private fb: FormBuilder
    ) {
        translate.addLangs(['en', 'vi']);
        this.route.queryParams.subscribe(params => {
            this.phoneURL = params.phone;
        });
        if (this.dataStorageService.getPhone()) {
            this.getPhoneUrl = this.dataStorageService.getPhone();
        }
    }

    ngOnInit() {
        console.log('Phone =>> ' + this.phoneURL);
        this.getPhoneOnUrlParam();
        this.getAllBanks();
        this.setLanguage();
        this.myFormChooseListBank = this.fb.group({
            bankInfo: this.fb.array([]),
        });
    }

    onChooseBank(CUST_GB: string, CUST_CD: string) {
        const bankFormArray = this.myFormChooseListBank.controls.bankInfo as FormArray;
        const index = bankFormArray.controls.findIndex(x => x.value.CUST_GB === CUST_GB && x.value.CUST_CD === CUST_CD);
        console.log(index);
        if (index === -1) {
            bankFormArray.push(new FormControl({CUST_GB, CUST_CD}));
            const value = this.myFormChooseListBank.value;
            this.dataStorageService.saveInstitution(value);
            this.selectedBank = this.dataStorageService.getInstitution();
            this.selectedBank = this.selectedBank.bankInfo[0] ? this.selectedBank : null;
            console.log(this.selectedBank);
        } else {
            bankFormArray.removeAt(index);
            const value = this.myFormChooseListBank.value;
            this.dataStorageService.saveInstitution(value);
            this.selectedBank = this.dataStorageService.getInstitution();
            this.selectedBank = this.selectedBank.bankInfo[0] ? this.selectedBank : null;
            console.log(this.selectedBank);
        }
    }

    getPhoneOnUrlParam() {
        if (this.phoneURL) {
            this.dataStorageService.savePhone(this.phoneURL);
            this.dataStorageService.saveIsPhone('true');
        }
    }

    setLanguage() {
        this.LANGUAGE = this.storageLocal.getLanguage();
        if (this.LANGUAGE) {
            this.translate.use(this.LANGUAGE);
        }
    }

    getInputLanguage(input: string , language: string) {
        this.inputLanguage = input;
        this.displayLanguage = language;
        this.isShowButtonChooseLanguage = true;
    }

    saveLanguageAfterChoose() {
        if (this.inputLanguage) {
            this.storageLocal.saveLanguage(this.inputLanguage);
            this.setLanguage();
        }
    }

    // -------------------------- get all the banks -----------------------------------
    getAllBanks() {
        this.bankService.getBanks(10).subscribe(next => {
            this.banks = next;
            console.log(next);
            console.log('success to get all banks');
        }, error => {
            console.log(error);
            console.log('fail to get banks');
        });
    }

    // ------------------------------ store the chosen institution --------------------------------------
    // getId(id: string, institution: string) {
    //     console.log(this.bankId);
    //     this.bankId = id;
    //     this.custCD = institution;
    //     this.dataStorageService.saveInstitution(institution);
    // }

    backToChooseLanguage() {
        console.log(this.getPhoneUrl);
        this.bankId = null;
        this.storageLocal.clear();
        this.setLanguage();
        this.isShowButtonChooseLanguage = false;
        if (this.getPhoneUrl) {
            this._router.navigateByUrl('/banks?phone=' + this.getPhoneUrl);
        }
    }
}
