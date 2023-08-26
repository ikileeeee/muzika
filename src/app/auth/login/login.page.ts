import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onLogin(form: NgForm){
    if(form.valid){
    console.log(form.value)
    this.authService.login(form.value).subscribe(resData =>{
    console.log(resData);
    console.log('Uspesan LOGIN');
    this.router.navigateByUrl('/');});
  }else{
    console.log('Nije dobar email/password');
  }
}
}
