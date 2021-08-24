import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiService} from '../../servicios/api/api.service';
import {LoginI} from '../../modelos/login.interface';

import {Router} from '@angular/router';
import { ResponseI } from '../../modelos/response.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    usuario: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  constructor(private api:ApiService, private router:Router) { }

   errorStatus:boolean= false;
   errorMsj:any ="";


  ngOnInit(): void {
  this.checkLocalstorage();
  }
  checkLocalstorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['dashboard'])
    }
  }

  onLogin(form:LoginI){

    this.api.loginByEmail(form).subscribe(data =>{
    let dataResponse:ResponseI = data;
    if(dataResponse.status=="ok"){
    localStorage.setItem("token",dataResponse.result.token);
    this.router.navigate(['dashboard']);
    }else{
      this.errorStatus = true;
      this.errorMsj = dataResponse.result.console.error_msg;

    }
    });
  }

}

