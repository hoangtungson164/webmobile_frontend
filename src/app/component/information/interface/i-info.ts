export class IInfo {
    fiCode: string;
    taskCode = 'CIC_MACR_RQST';
    name: string;
    natId: string;
    infoProvConcent = 'Y';

    constructor(FICODE, FULL_NAME, NATIONAL_ID) {
        this.fiCode = FICODE;
        this.natId = NATIONAL_ID;
        this.name = FULL_NAME;
    }
}
