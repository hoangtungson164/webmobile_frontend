import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataStorageService} from '../../storage/data-storage.service';
import {MustMatch} from '../../validators/mustMatch';

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

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dataStorageService: DataStorageService,
        private fb: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
                username: ['', [Validators.required, Validators.minLength(2)]],
                password: ['', [Validators.required, Validators.minLength(2)]],
                confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
            }, {
            validator: MustMatch('password', 'confirmPassword')
        });
        this.id = +this.route.snapshot.paramMap.get('id');
        this.report = this.dataStorageService.getReportName();
    }

    checkBox() {
        this.check = !this.check;
    }

    get f() {
        return this.loginForm.controls;
    }

    // ------------------------store after click next button ----------------------------------------------
    onSubmit() {
        const {value} = this.loginForm;
        this.dataStorageService.saveUserId(value.username);
        this.dataStorageService.savePassword(value.password);
        this.router.navigateByUrl('/banks/' + this.id + '/inquiryReport');
    }
}
