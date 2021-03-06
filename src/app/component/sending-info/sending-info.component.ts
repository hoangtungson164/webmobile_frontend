import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataStorageService} from '../../storage/data-storage.service';
import {IReport} from './interface/i-report';
import {SendingInfoService} from './service/sending-info.service';
import {TranslateService} from '@ngx-translate/core';
import {IBankSelected} from '../bank-list/interface/IBankSelected';

@Component({
    selector: 'app-sending-info',
    templateUrl: './sending-info.component.html',
    styleUrls: ['./sending-info.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SendingInfoComponent implements OnInit {

    id: number;

    check = false;

    reports: IReport[];
    LANGUAGE: string;
    nationalId: string;
    fullName: string;
    banksChoose: IBankSelected;

    constructor(
        private route: ActivatedRoute,
        private dataStorageService: DataStorageService,
        private sendingInfoService: SendingInfoService,
        public translate: TranslateService,
        private storageLocal: DataStorageService
    ) {
        this.banksChoose = this.dataStorageService.getInstitution();
        this.LANGUAGE = this.storageLocal.getLanguage();
        if (this.LANGUAGE) {
            this.translate.use(this.LANGUAGE);
        }
    }

    ngOnInit() {
        // this.getAllReport();
        this.removeDisableInput();
    }

    // ---------------------- get all the inquiry-report --------------------------------------
    getAllReport() {
        this.sendingInfoService.getAllReport(this.banksChoose.bankInfo[0].CUST_GB , this.banksChoose.bankInfo[0].CUST_CD).subscribe(next => {
            this.reports = next;
            console.log(next);
            console.log('success get all the report');
        }, error => {
            console.log(error);
            console.log('fail to get all the report');
        });
    }

    // ------------------------ store the chosen inquiry-report -------------------------------------
    checkBox() {
        this.check = true;
        // this.dataStorageService.saveReportCode(report);
        // this.dataStorageService.saveReportName(name);
    }

    onNext() {
        this.nationalId = this.dataStorageService.getNationalId();
        this.fullName = this.dataStorageService.getName();
        return this.nationalId && this.fullName;
    }

    saveDisableInput() {
        this.dataStorageService.saveDisableInput('true');
    }

    removeDisableInput() {
        this.dataStorageService.removeDisableInput();
    }
}
