import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewsPage } from './views';

@NgModule({
  declarations: [
    ViewsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewsPage),
  ],
})
export class ViewsPageModule {}
