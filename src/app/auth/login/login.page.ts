import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  
  constructor(private authService: AuthService, private router: Router, private alertC: AlertController) { }

  ngOnInit() {
  }
  onLogin(form: NgForm){
    if(form.valid){
    console.log(form.value)
    this.authService.login(form.value).subscribe(resData =>{
    console.log(resData);
    console.log('Uspesan LOGIN');
    this.router.navigateByUrl('/my-recommendations');},
    
    errRes=>{
      let message;
      message="Invalid email or password";
      console.log(errRes);
      const greska= errRes.error.error.message;
      if(greska==='EMAIL_NOT_FOUND'){
        message='Email adrees was not found!'
      }else if( greska=== 'INVALID_PASSWORD'){
        message="Invalid password!"
      }
      this.alertC.create({
        header: "Authentification failed.",
        message,
        buttons:[ "Okay"]
      }).then( (alert: HTMLIonAlertElement)=>{
      alert.present();
    });

    }
    );
   

  }else{
    console.log('Nije dobar email/password');
  }
}
}
