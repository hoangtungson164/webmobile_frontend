import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataStorageService} from '../../storage/data-storage.service';
import {IReport} from './interface/i-report';
import {SendingInfoService} from './service/sending-info.service';
import {TranslateService} from '@ngx-translate/core';

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

    constructor(
        private route: ActivatedRoute,
        private dataStorageService: DataStorageService,
        private sendingInfoService: SendingInfoService,
        public translate: TranslateService,
        private storageLocal: DataStorageService
    ) {
        this.LANGUAGE = this.storageLocal.getLanguage();
        if (this.LANGUAGE) {
            this.translate.use(this.LANGUAGE);
        }
    }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.getAllReport();
    }

    // ---------------------- get all the inquiry-report --------------------------------------
    getAllReport() {
        this.sendingInfoService.getAllReport(10, this.id).subscribe(next => {
            this.reports = next;
            console.log('success get all the report');
        }, error => {
            console.log(error);
            console.log('fail to get all the report');
        });
    }

    // ------------------------ store the chosen inquiry-report -------------------------------------
    checkBox(report: string, name: string) {
        this.check = true;
        this.dataStorageService.saveReportCode(report);
        this.dataStorageService.saveReportName(name);
    }
}
