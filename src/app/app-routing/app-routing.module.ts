import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BankListComponent} from '../component/bank-list/bank-list.component';
import {BankConsensusComponent} from '../component/bank-consensus/bank-consensus.component';
import {SendingInfoComponent} from '../component/sending-info/sending-info.component';
import {LoginComponent} from '../component/login/login.component';
import {InquiryReportComponent} from '../component/inquiry-report/inquiry-report.component';
import {RedirectBackendComponent} from '../component/redirect-backend/redirect-backend.component';
import {UserGuideComponent} from '../component/user-guide/user-guide.component';

const routes: Routes = [{
  path: '',
  component: BankListComponent,
}, {
  path: 'banks',
  component: BankListComponent,
}, {
  path: 'banks/consensus',
  component: BankConsensusComponent,
}, {
  path: 'banks/sending',
  component: SendingInfoComponent,
}, {
  path: 'banks/login',
  component: LoginComponent,
}, {
  path: 'banks/inquiryReport',
  component: InquiryReportComponent,
}, {
  path: 'user-guide',
  component: UserGuideComponent,
}, {
  path: '**',
  component: UserGuideComponent
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
