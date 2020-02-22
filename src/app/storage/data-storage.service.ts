import {Injectable} from '@angular/core';

const INSTITUTION = 'Target Institution';
const CREDIT_REPORT = 'Credit inquiry-report code';
const NAME = 'Full name';
const NATIONAL_ID = 'National id';
const CREDIT_NAME = 'Credit name';
const USER_ID = 'user_id';
const PASSWORD = 'password';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor() {
    }

    public saveInstitution(institution: string) {
        window.sessionStorage.removeItem(INSTITUTION);
        window.sessionStorage.setItem(INSTITUTION, institution);
    }

    public getInstitution(): string {
        return sessionStorage.getItem(INSTITUTION);
    }

    public saveReportName(reportName: string) {
        window.sessionStorage.removeItem(CREDIT_NAME);
        window.sessionStorage.setItem(CREDIT_NAME, reportName);
    }

    public getReportName(): string {
        return sessionStorage.getItem(CREDIT_NAME);
    }

    public saveReportCode(reportCode: string) {
        window.sessionStorage.removeItem(CREDIT_REPORT);
        window.sessionStorage.setItem(CREDIT_REPORT, reportCode);
    }

    public getReportCode(): string {
        return sessionStorage.getItem(CREDIT_REPORT);
    }

    public saveName(name: string) {
        window.sessionStorage.removeItem(NAME);
        window.sessionStorage.setItem(NAME, name);
    }

    public getName(): string {
        return sessionStorage.getItem(NAME);
    }

    public saveNationalId(nationalId: string) {
        window.sessionStorage.removeItem(NATIONAL_ID);
        window.sessionStorage.setItem(NATIONAL_ID, nationalId);
    }

    public getNationalId(): string {
        return sessionStorage.getItem(NATIONAL_ID);
    }

    public saveUserId(userId: string) {
        window.sessionStorage.removeItem(USER_ID);
        window.sessionStorage.setItem(USER_ID, userId);
    }

    public getUserId(): string {
        return sessionStorage.getItem(USER_ID);
    }


    public savePassword(password: string) {
        window.sessionStorage.removeItem(PASSWORD);
        window.sessionStorage.setItem(PASSWORD, password);
    }

    public getPassword(): string {
        return sessionStorage.getItem(PASSWORD);
    }

    public clear(): void {
        sessionStorage.clear();
    }
}
