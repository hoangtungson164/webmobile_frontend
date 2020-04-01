import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BankService} from '../bank-list/service/bank.service';
import {IBankConsensus} from './interface/i-bank-consensus';
import {ActivatedRoute} from '@angular/router';
import {DataStorageService} from '../../storage/data-storage.service';
import {TranslateService} from '@ngx-translate/core';
import {MatCheckboxChange} from '@angular/material';

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
    custCD: string;
    isConsentCollectionChecked = false;
    isConsentProvidingChecked = false;
    isConsentUsingChecked = false;
    isConsentCheckedAll = false;

    constructor(
        private bankService: BankService,
        private route: ActivatedRoute,
        private dataStorageService: DataStorageService,
        private translate: TranslateService,
    ) {
        this.custCD = this.dataStorageService.getInstitution();
        this.LANGUAGE = this.dataStorageService.getLanguage();
        if (this.LANGUAGE) {
            this.translate.use(this.LANGUAGE);
        }
    }

    ngOnInit() {
        this.nationalId = this.dataStorageService.getNationalId();
        this.fullName = this.dataStorageService.getName();
        this.id = +this.route.snapshot.paramMap.get('id');
        this.getConsensus();
    }

    // --------------------------- get all the agreements ----------------------------------
    getConsensus() {
        this.bankService.getBankConsensusById(this.id, this.custCD).subscribe(next => {
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
        this.isConsentCheckedAll = e.checked;
        this.isConsentCollectionChecked = e.checked;
        this.isConsentUsingChecked = e.checked;
        this.isConsentProvidingChecked = e.checked;
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
        }  else {
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
        }  else {
            this.isConsentCheckedAll = false;
            this.agreeAll = false;
        }
    }

    consentProvideCheck(e: MatCheckboxChange) {
        this.isConsentProvidingChecked = e.checked;
        console.log(this.isConsentCollectionChecked, this.isConsentUsingChecked, this.isConsentProvidingChecked);
        if (this.isConsentCollectionChecked && this.isConsentUsingChecked && this.isConsentProvidingChecked) {
            this.isConsentCheckedAll = true;
            this.agreeAll = true;
        }  else {
            this.isConsentCheckedAll = false;
            this.agreeAll = false;
        }
    }

}
