import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent {
  baseUrl = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  get404Error(){
    this.http.get(this.baseUrl +"products/100").subscribe({
      next: response => console.log(),
      error: error => console.error() 
    });
  }

  get500Error(){
    this.http.get(this.baseUrl +"buggy/servererror").subscribe({
      next: response => console.log(),
      error: error => console.error() 
    });
  }
  get400Error(){
    this.http.get(this.baseUrl +"buggy/badrequest").subscribe({
      next: response => console.log(),
      error: error => console.error() 
    });
  }
  get400ValidationError(){
    this.http.get(this.baseUrl +"product/fortytwo").subscribe({
      next: response => console.log(),
      error: error => console.error() 
    });
  }
}
