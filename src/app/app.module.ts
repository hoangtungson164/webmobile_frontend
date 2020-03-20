import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BankListComponent} from './component/bank-list/bank-list.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {HeadingComponent} from './header-footer/heading/heading.component';
import {BankConsensusComponent} from './component/bank-consensus/bank-consensus.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SendingInfoComponent} from './component/sending-info/sending-info.component';
import {LoginComponent} from './component/login/login.component';
import { InformationComponent } from './component/information/information.component';
import { FooterComponent } from './header-footer/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { InquiryReportComponent } from './component/inquiry-report/inquiry-report.component';
import {HttpErrorInterceptor} from './http-error.interceptor';
import { RedirectBackendComponent } from './component/redirect-backend/redirect-backend.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {DatePipe} from '@angular/common';


@NgModule({
    declarations: [
        AppComponent,
        BankListComponent,
        HeadingComponent,
        BankConsensusComponent,
        SendingInfoComponent,
        LoginComponent,
        InformationComponent,
        FooterComponent,
        InquiryReportComponent,
        RedirectBackendComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatRadioModule,
        MatTableModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        }, DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
