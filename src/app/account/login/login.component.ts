import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/accout/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private accountService: AccountService, private router:Router) { }

  loginForm = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),  
    password: new FormControl("",Validators.required),  
  })

  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigateByUrl("/shop")
    })
  }
  




  ngOnInit(): void {
  }

}
