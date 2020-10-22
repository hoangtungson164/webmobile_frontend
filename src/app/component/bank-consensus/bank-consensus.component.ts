import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BankService } from '../bank-list/service/bank.service';
import { IBankConsensus } from './interface/i-bank-consensus';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../../storage/data-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { MatCheckboxChange } from '@angular/material';
import { IBankSelected } from '../bank-list/interface/IBankSelected';
@Component({
    selector: 'app-bank-consensus',
    templateUrl: './bank-consensus.component.html',
    styleUrls: ['./bank-consensus.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class BankConsensusComponent implements OnInit {

    bankConsensus: IBankConsensus;
    id: number;
    agreeAll = false;
    fullName: string;
    nationalId: string;
    LANGUAGE: string;
    banksChoose: IBankSelected;
    isConsentCollectionChecked = false;
    isConsentProvidingChecked = false;
    isConsentUsingChecked = false;
    isConsentCheckedAll = false;
    isReadConsentDataproviding: boolean;
    isReadConsentDataUsing: boolean;
    isReadConsentDataCollection: boolean;
    isAgreeAll = false;

    constructor(
        private bankService: BankService,
        private route: ActivatedRoute,
        private dataStorageService: DataStorageService,
        private translate: TranslateService,
    ) {
        this.banksChoose = this.dataStorageService.getInstitution();
        this.LANGUAGE = this.dataStorageService.getLanguage();
        if (this.LANGUAGE) {
            this.translate.use(this.LANGUAGE);
        }
    }

    ngOnInit() {
        this.nationalId = this.dataStorageService.getNationalId();
        this.fullName = this.dataStorageService.getName();
    }

    // --------------------------- get all the agreements ----------------------------------
    getConsensus() {
        this.bankService.getBankConsensusById(this.banksChoose.bankInfo[0].CUST_GB, this.banksChoose.bankInfo[0].CUST_CD).subscribe(next => {
            this.bankConsensus = next[0];
            console.log(next);
            console.log('success to get consensus');
        }, error => {
            console.log('fail to get consensus');
        });
    }

    // ---------------------------- go to next page until agree -------------------------------
    agreeWith(e: MatCheckboxChange) {
        this.agreeAll = e.checked;
    }

    onNext() {
        this.nationalId = this.dataStorageService.getNationalId();
        this.fullName = this.dataStorageService.getName();
        return this.nationalId && this.fullName && this.agreeAll;
    }

    consentCollectionCheck(e: MatCheckboxChange) {
        this.isConsentCollectionChecked = e.checked;
        if (this.isConsentCollectionChecked && this.isConsentUsingChecked && this.isConsentProvidingChecked) {
            this.isConsentCheckedAll = true;
            this.agreeAll = true;
        } else {
            this.isConsentCheckedAll = false;
            this.agreeAll = false;
        }
        console.log('clickkkk');
        console.log(this.isConsentCollectionChecked, this.isConsentUsingChecked, this.isConsentProvidingChecked);
    }

    consentUsingCheck(e: MatCheckboxChange) {
        this.isConsentUsingChecked = e.checked;
        if (this.isConsentCollectionChecked && this.isConsentUsingChecked && this.isConsentProvidingChecked) {
            this.isConsentCheckedAll = true;
            this.agreeAll = true;
        } else {
            this.isConsentCheckedAll = false;
            this.agreeAll = false;
        }
    }

    consentProvideCheck(e: MatCheckboxChange) {
        if (this.isReadConsentDataproviding)
            this.isConsentProvidingChecked = e.checked;
        console.log(this.isConsentCollectionChecked, this.isConsentUsingChecked, this.isConsentProvidingChecked, this.isReadConsentDataproviding);
        if (this.isConsentCollectionChecked && this.isConsentUsingChecked && this.isConsentProvidingChecked) {
            this.isConsentCheckedAll = true;
            this.agreeAll = true;
        } else {
            this.isConsentCheckedAll = false;
            this.agreeAll = false;
        }
    }

    readConsentDataproviding(value: any) {
        this.isReadConsentDataproviding = JSON.parse(value);
        if (this.isReadConsentDataCollection && this.isReadConsentDataUsing && this.isReadConsentDataproviding) {
            this.isAgreeAll = true;
        } else {
            this.isAgreeAll = false;
        }
    }

    readConsentDataUsing(value: any) {
        this.isReadConsentDataUsing = JSON.parse(value);
        if (this.isReadConsentDataCollection && this.isReadConsentDataUsing && this.isReadConsentDataproviding) {
            this.isAgreeAll = true;
        } else {
            this.isAgreeAll = false;
        }
    }

    readConsentDataCollection(value: any) {
        this.isReadConsentDataCollection = JSON.parse(value);
        if (this.isReadConsentDataCollection && this.isReadConsentDataUsing && this.isReadConsentDataproviding) {
            this.isAgreeAll = true;
        } else {
            this.isAgreeAll = false;
        }
    }

}
