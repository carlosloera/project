import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
/**
 * Generated class for the RegistrarsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrarse',
  templateUrl: 'registrarse.html',
})
export class RegistrarsePage {
  nombre:string;
  apellidoM:string;
  apellidoP:string;
  username:string;
  password:string;
  correo:string;
  fecha_nacimiento:Date;
  sexo;
  licencia:boolean;
  direccion:string;
  codigo_postal:string;
  celular:string;

  public form:FormGroup;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public registrar:AuthProvider,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController,
              private FB:FormBuilder 
              ) {

             this.form=FB.group({
              nombre: new FormControl ('',[Validators.required,Validators.pattern("[A-Za-z]+"),Validators.maxLength(20)]),
              apellidoM: new FormControl ('',[Validators.required,Validators.pattern("[A-Za-z]+"),Validators.maxLength(20)]),
              apellidoP: new FormControl ('',[Validators.required,Validators.pattern("[A-Za-z]+"),Validators.maxLength(20)]),
              username: new FormControl('',[Validators.required, Validators.minLength(6)]),
              password: new FormControl('',[Validators.required]),
              correo: new FormControl('',[Validators.required, Validators.pattern("[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{3}")]),
              fecha_nacimiento: new FormControl('',[Validators.required]),
              sexo: new FormControl('',[Validators.required]),
              direccion: new FormControl('',[Validators.required]),
              licencia: new FormControl('',[Validators.required]),
              codigo_postal: new FormControl('',[Validators.required,Validators.minLength(5), Validators.maxLength(5)] ),
              celular: new FormControl('',[Validators.required,Validators.minLength(10), Validators.maxLength(10)])
             });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarsePage');
  }


  createItem(){
    let registro={
      nombre:this.form.value.nombre,
      apellidoP:this.form.value.apellidoP,
      apellidoM:this.form.value.apellidoM,
      username:this.form.value.username,
      password:this.form.value.password,
      correo:this.form.value.correo,
      fecha_nacimiento:this.form.value.fecha_nacimiento,
      sexo:this.form.value.sexo,
      licencia:this.form.value.licencia,
      direccion:this.form.value.direccion,
      codigo_postal:this.form.value.codigo_postal,
      celular:this.form.value.celular,

    };
    let loading=this.loadingCtrl.create({
      content:"Espere por favor.."
    });
    loading.present();
    this.registrar.create(registro)
    .then(valido=>{
        loading.dismiss();
        if (valido) {
          this.navCtrl.push(LoginPage);
        }
        else{
          this.alertCtrl.create({
            title: " Error ",
            subTitle: "Surgio un error",
            buttons: ["OK"]
          }).present();
        }

    })
    .catch(error=>{
      loading.dismiss();
    })
   
  } 

}
