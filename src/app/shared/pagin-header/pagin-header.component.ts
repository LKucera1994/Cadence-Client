import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagin-header',
  templateUrl: './pagin-header.component.html',
  styleUrls: ['./pagin-header.component.css']
})
export class PaginHeaderComponent implements OnInit {
  @Input() totalCount?:number;
  @Input() pageNumber?:number;
  @Input() pageSize?:number;

  constructor() { }

  ngOnInit(): void {
  }

}
