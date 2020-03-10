import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataStorageService} from '../../storage/data-storage.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

    informationForm: FormGroup;
    LANGUAGE: string;

    constructor(
        private fb: FormBuilder,
        private dataStorageService: DataStorageService,
        public translate: TranslateService,
        private storageLocal: DataStorageService
    ) {
        this.LANGUAGE = this.storageLocal.getLanguage();
        if (this.LANGUAGE) {
            this.translate.use(this.LANGUAGE);
        }
    }

    ngOnInit() {
        if (this.dataStorageService.getName() || this.dataStorageService.getNationalId()) {
            this.informationForm = this.fb.group({
                full_name: [this.dataStorageService.getName(), [Validators.required,
                    Validators.pattern('^[^0-9]+$')]],
                national_id: [this.dataStorageService.getNationalId(), [Validators.required,
                    Validators.pattern('^[0-9]{9,12}$')]]
            });
        } else {
            this.informationForm = this.fb.group({
                full_name: ['', [Validators.required, Validators.minLength(5)]],
                national_id: ['', [Validators.required, Validators.minLength(9)]]
            });
        }
    }

    // ------------------------------------- get validate -------------------------------------------------------
    get f() {
        return this.informationForm.controls;
    }

    // ------------------------- store the individual data to session --------------------------------
    saveData() {
        const {value} = this.informationForm;
        if (value.full_name.length < 5 || value.national_id.length < 9 || value.national_id.length > 12) {
            this.dataStorageService.saveName('');
            this.dataStorageService.saveNationalId('');
        } else {
            this.dataStorageService.saveName(value.full_name);
            this.dataStorageService.saveNationalId(value.national_id);
        }
        console.log(value);
    }

}
