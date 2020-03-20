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
    isPhone: string;

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
        this.isPhone = this.dataStorageService.getIsPhone();
        if (this.dataStorageService.getName() || this.dataStorageService.getNationalId() || this.dataStorageService.getPhone()) {
            this.informationForm = this.fb.group({
                full_name: [this.dataStorageService.getName(), [Validators.required,
                    Validators.pattern('^[^0-9]+$'), Validators.minLength(5)]],
                national_id: [this.dataStorageService.getNationalId(), [Validators.required,
                    Validators.pattern('^[0-9]{9,12}$'), Validators.minLength(9)]],
                phone: [this.dataStorageService.getPhone() , [Validators.required,
                    Validators.pattern(/((09|03|07|08|05|00|01|02|04|06)+([0-9]{8,9})\b)/g)]]
            });
        } else {
            this.informationForm = this.fb.group({
                full_name: ['', [Validators.required, Validators.minLength(5)],
                    Validators.pattern('^[^0-9]+$')],
                national_id: ['', [Validators.required, Validators.minLength(9),
                    Validators.pattern('^[0-9]{9,12}$')]],
                phone: ['' , [Validators.required,
                    Validators.pattern(/((09|03|07|08|05|00|01|02|04|06)+([0-9]{8,9})\b)/g)]]
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
            this.dataStorageService.savePhone('');
        } else {
            this.dataStorageService.saveName(value.full_name);
            this.dataStorageService.saveNationalId(value.national_id);
            this.dataStorageService.savePhone(value.phone);
        }
        console.log(value);
    }

}
