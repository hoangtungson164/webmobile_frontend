export class ICic {
    orgCd: string;
    appCd: string;
    svcCd: string;
    userId: string;
    userPw: string;

    constructor(orgCd: string, appCd: string, svcCd: string, userId: string, userPw: string) {
        this.orgCd = orgCd;
        this.appCd = appCd;
        this.svcCd = svcCd;
        this.userId = userId;
        this.userPw = userPw;
    }
}
