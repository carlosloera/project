import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
         LoadingController,AlertController, 
         MenuController } from 'ionic-angular';

import { HomePage } from './../home/home';
import { RegistrarsePage} from './../registrarse/registrarse';
import { AuthProvider } from '../../providers/auth/auth';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  name:string;
  password:string;
  
  public form:FormGroup;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth:AuthProvider,
              private alertCtrl:AlertController,
              private loadingCtrl:LoadingController,
              private FB:FormBuilder,
              private menu:MenuController
              ) {

          this.form   =FB.group({
            name:  new FormControl('',[Validators.required, Validators.minLength(6)]),
            password: new FormControl ('',[Validators.required])
          });    
          
  }
 
  

  ionViewDidLoad() {
    this.menu.swipeEnable(false);
    console.log('ionViewDidLoad LoginPage');
  }

  Registrarse () {
    this.navCtrl.push(RegistrarsePage);
  }

  Home () {
    this.navCtrl.push(HomePage);
    
  }

  logIn(){
    
    if (this.form.valid) {
      let log={
        username:this.form.value.name,
        password:this.form.value.password
      };
      
      let loading=this.loadingCtrl.create({
        content:"Loading"
      });
      loading.present();
      this.auth.sigIn(log)
      .then(value=>{  
        loading.dismiss();
        if(value==true){
          this.navCtrl.push(HomePage);
        }
        else{
          this.alertCtrl.create({
            title: "Error de autenticacion",
            subTitle: "Usuario o Contraseña Incorrectos",
            buttons: ["OK"]
          }).present();
        }
      }).catch(error=>{
        loading.dismiss();
      });
    }
    else {
      this.alertCtrl.create({
        title: "Error ",
        subTitle: "llenar campos",
        buttons: ["OK"]
      }).present();
    }
    //console.log(login.name);

  }


}
