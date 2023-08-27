import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  
  constructor(private auth: AuthService,  private router: Router) { 
    this.registerForm=new FormGroup({});
  }

  ngOnInit() {
    this.registerForm= new FormGroup({
      username: new FormControl( "",Validators.required),
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("",[Validators.required, Validators.minLength(6)])
    })
  }
  onRegister(){
    console.log(this.registerForm); 
    this.auth.register(this.registerForm.value).subscribe(resData=>{
      console.log("Registrovan");
      console.log(resData);
    });
    this.router.navigateByUrl('/my-recommendations');

  }

}
