import { Component, OnInit } from '@angular/core';
import {CommonInfoService} from "../common-info.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public commonin:CommonInfoService) { }

  ngOnInit(): void {
  }

}
