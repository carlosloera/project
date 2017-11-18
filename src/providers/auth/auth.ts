import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController, NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: Http,
              public alert:AlertController) {

    console.log('Hello AuthProvider Provider');
  }

  sigIn(item):any{
    
   let headers=new Headers();
     
       headers.append('Content-Type','application/json');
   
       let option=new RequestOptions({headers:headers});
       //console.log("nombre "+item.name);
      let promesa= new Promise((resolve,reject)=>{ 
       this.http.post('http://localhost:8000/users/login',item,option)
       .subscribe(data=>{
          let res=data.json();
          if(res==true){
            resolve(true);
          }
          else{
            resolve(false);
          }
       }); 
       
      })
      return promesa;
  }


  create(item):any {
    
    let headers=new Headers();

    
    
    headers.append('Content-Type','application/json');

    let option=new RequestOptions({headers:headers});
    
    let promesa= new Promise((resolve,reject)=>{

      this.http.post('http://localhost:8000/users/registrar',item,option)
      .subscribe(data=>{
        let res=data.json();
        if (res!=true && res!=false){
          this.alert.create({
            title: " Error ",
            subTitle: res,
            buttons: ["OK"]
          }).present();
          resolve(false);
        }
        else if ( res==true){
          resolve(true);
        }
        else{
          resolve(false);
        }
        resolve();
      })
    })
    return promesa;
  }
}


