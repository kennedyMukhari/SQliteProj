import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { BehaviorSubject } from 'rxjs/Rx';
import { Platform } from 'ionic-angular/platform/platform';
import { Injectable } from '@angular/core';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export interface Emp {
  id: number,
  name: string,
 surname: string,
 email : string ,
 position : string,
 cnumber: string,
 gender: string
}
@Injectable()
export class DatabaseProvider {
  Db: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
  employees = new BehaviorSubject([]);

  constructor( private sqlite: SQLite, private platform: Platform) {
    console.log('Hello DatabaseProvider Provider');
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.openOrCreate();
    })
  }
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
  openOrCreate() {
    console.log('Open/Create DB')
    return this.sqlite.create({
      name: 'employee.db',
      location: 'default',

    }).then((Db: SQLiteObject) => {
      this.Db = Db;
      return this.Db.sqlBatch([
 
       
        'CREATE TABLE IF NOT EXISTS employee(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(32),surname VARCHAR(32),email VARCHAR(32),position VARCHAR(32), cnumber VARCHAR(10),gender VARCHAR(10))'
      ]).then((data) => {
        console.log('After Batch')
        this.databaseReady.next(true);
        return data;
      });
    })
  }
  addEmployee(name, surname,email,position,gender,cnumber){
    return this.Db.executeSql('INSERT INTO employee (name,surname,email,position,cnumber,gender) VALUES (?,?,?,?,?,?)', [name, surname,email,position,gender,cnumber]);
  }
  updateEmployee(emp: Emp){
    let data = [emp.name,emp.gender,emp.position,emp.surname];
    return this.Db.executeSql(`UPDATE employee SET name = ?, gender = ?, position = ?, surname = ? WHERE id = ${emp.id}`, data).then((data) =>{
      this.loadEmployees();
    })
   }

  getEmployees(){
    return this.Db.executeSql('SELECT * FROM employee', null).then((data) => {
      let results = [];
      for (let i = 0; i < data.rows.length; i++){
        results.push({name: data.rows.item(i).name, id: data.rows.item(i).id, surname: data.rows.item(i).surname,email: data.rows.item(i).email,position: data.rows.item(i).position,gender: data.rows.item(i).gender,cnumber: data.rows.item(i).cnumber,})
      }
      return results;
    });
  }
  delete_employee(id){
    return new Promise((resolve,reject) =>{
      this.Db.executeSql("DELETE FROM employee WHERE id=? ",[id])
  .then(res=>resolve(res))
  .catch(err=>reject(err));
    })
  }
  get_dataByid(id): Promise<Emp> {

    return  this.Db.executeSql('SELECT * FROM employee WHERE id=?',[id]).then(data => {
     
      return {
        id: data.rows.item(0).id,
        name: data.rows.item(0).name, 
        surname: data.rows.item(0).surname,
        email: data.rows.item(0).email,
        position: data.rows.item(0).position,
        gender: data.rows.item(0).gender,
        cnumber: data.rows.item(0).cnumber,
        
      }
    });
    }
    loadEmployees() {
      return this.Db.executeSql('SELECT * FROM employee', []).then(data => {
        let employees: Emp [] = [];
   
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
   
   
            employees.push({
              id: data.rows.item(i).id,
              name: data.rows.item(i).name, 
              surname: data.rows.item(i).surname,
              email: data.rows.item(i).email,
              position: data.rows.item(i).position,
              gender: data.rows.item(i).gender,
              cnumber: data.rows.item(i).cnumber,
   
             });
          }
        }
        this.employees.next(employees);
      });
    }
}
