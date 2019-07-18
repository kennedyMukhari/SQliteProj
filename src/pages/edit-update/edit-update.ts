import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Emp, DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the EditUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-update',
  templateUrl: 'edit-update.html',
})
export class EditUpdatePage {

  Employees : Emp = null;

  empID: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider,public toastCtrl: ToastController, private viewCtrl: ViewController) {
        this.empID =  this.navParams.data;
   this.loadEmployees(this.empID);
  }
 
  ionViewDidEnter() {
 
 
  }
 loadEmployees(id) {
    this.databaseProvider.get_dataByid(id).then((res) => {
      console.log(res);
 
      this.Employees = res;
    })
  }
  update(){
    this.databaseProvider.updateEmployee(this.Employees).then(async (res) => {
      let toast = await this.toastCtrl.create({
        message: 'Employee updated',
        duration: 3000
      });
      toast.present();
      this.viewCtrl.dismiss({ reload: true });
    });
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
