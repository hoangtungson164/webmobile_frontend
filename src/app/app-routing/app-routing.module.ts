import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BankListComponent} from '../component/bank-list/bank-list.component';
import {BankConsensusComponent} from '../component/bank-consensus/bank-consensus.component';
import {SendingInfoComponent} from '../component/sending-info/sending-info.component';
import {LoginComponent} from '../component/login/login.component';
import {InquiryReportComponent} from '../component/inquiry-report/inquiry-report.component';

const routes: Routes = [{
  path: '',
  component: BankListComponent,
}, {
  path: 'banks/:id/consensus',
  component: BankConsensusComponent,
}, {
  path: 'banks/:id/sending',
  component: SendingInfoComponent,
}, {
  path: 'banks/:id/login',
  component: LoginComponent,
}, {
  path: 'banks/:id/inquiryReport',
  component: InquiryReportComponent,
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
