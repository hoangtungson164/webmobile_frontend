export class IUser {
    username: string;
    password: string;
    bankCode: string;

    constructor(username, password, bankCode) {
        this.username = username;
        this.password = password;
        this.bankCode = bankCode;
    }
}
