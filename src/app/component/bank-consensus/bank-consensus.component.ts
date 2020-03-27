import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BankService} from '../bank-list/service/bank.service';
import {IBankConsensus} from './interface/i-bank-consensus';
import {ActivatedRoute} from '@angular/router';
import {DataStorageService} from '../../storage/data-storage.service';
import {TranslateService} from '@ngx-translate/core';

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
    agreeWith() {
        this.agreeAll = !this.agreeAll;
    }

    onNext() {
        this.nationalId = this.dataStorageService.getNationalId();
        this.fullName = this.dataStorageService.getName();
        return this.nationalId && this.fullName && this.agreeAll;
    }

}
