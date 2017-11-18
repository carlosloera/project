import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { RegistrarsePage } from '../registrarse/registrarse';

@NgModule({
  declarations: [
    LoginPage,
    RegistrarsePage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
