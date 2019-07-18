import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider, Emp } from '../../providers/database/database';

/**
 * Generated class for the ViewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-views',
  templateUrl: 'views.html',
})
export class ViewsPage {
  employee: Emp = null;
  empID: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider) {
    this.empID = this.navParams.data;
    this.loadEmployees(this.empID);
  }

  ionViewDidLoad() {

  }
  loadEmployees(id) {
    this.databaseProvider.get_dataByid(id).then((res) => {
      console.log(res);

      this.employee = res;
    })
  }
}
