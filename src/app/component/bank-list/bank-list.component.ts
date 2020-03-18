import {Component, OnInit} from '@angular/core';
import {BankService} from './service/bank.service';
import {IBank} from './interface/ibank';
import {DataStorageService} from '../../storage/data-storage.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';

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

    constructor(
        private bankService: BankService,
        private dataStorageService: DataStorageService,
        public translate: TranslateService,
        private storageLocal: DataStorageService,
        private route: ActivatedRoute
    ) {
        translate.addLangs(['en', 'vi']);
        this.route.queryParams.subscribe(params => {
            this.phoneURL = params.phone;
        });
    }

    ngOnInit() {
        console.log('Phone =>> ' + this.phoneURL);
        if (this.phoneURL) {
            this.dataStorageService.savePhone(this.phoneURL);
            this.dataStorageService.savePhoneUrl(this.phoneURL);
        }
        this.getAllBanks();
        this.setLanguage();
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
    getId(id: string, institution: string) {
        console.log(this.bankId);
        this.bankId = id;
        this.dataStorageService.saveInstitution(institution);
    }

    backToChooseLanguage() {
        this.bankId = null;
        this.storageLocal.clear();
        this.setLanguage();
        this.isShowButtonChooseLanguage = false;
    }
}
