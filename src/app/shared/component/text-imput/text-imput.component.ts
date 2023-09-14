import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-imput',
  templateUrl: './text-imput.component.html',
  styleUrls: ['./text-imput.component.css']
})
export class TextImputComponent implements ControlValueAccessor {
  @Input() type ="text";
  @Input() label = "";


  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
   }
  writeValue(obj: any): void {
    
  }
  registerOnChange(fn: any): void {
    
  }
  registerOnTouched(fn: any): void {
    
  }

  get control(): FormControl{
    return this.controlDir.control as FormControl
  }
  

  

}
