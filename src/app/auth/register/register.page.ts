import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  
  constructor() { 
    this.registerForm=new FormGroup({});
  }

  ngOnInit() {
    this.registerForm= new FormGroup({
      username: new FormControl('Ivana', Validators.required),
      email: new FormControl('ivanicadr00@gmail.cpm', [Validators.required, Validators.email]),
      password: new FormControl('Ivana5', [Validators.required, Validators.minLength(6)])
    })
  }
  onRegister(){
    console.log(this.registerForm);
  }

}
