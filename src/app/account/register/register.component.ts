import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { AccountService } from 'src/app/accout/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errors: string[] | null = null;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router) { }

  complexPassword ="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,}$";

  registerForm = this.formBuilder.group({
    displayName: ['',Validators.required],
    email: ['',[Validators.required,Validators.email], [this.validateEmailNotTaken()] ],
    password: ['',[Validators.required,Validators.pattern(this.complexPassword)]]
  })


  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/shop'),
      error: error=> this.errors = error.errors
    })
  }

  validateEmailNotTaken(): AsyncValidatorFn{

    //Once the user entered a valid email address, wait 1000ms and check if the email already exists

    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() => {
          return this.accountService.checkEmailExists(control.value).pipe(
            map(result => result ? {emailExists:true} : null),
            finalize(() => control.markAllAsTouched())
          )         
        })
      )     
      
    }
  }
}
