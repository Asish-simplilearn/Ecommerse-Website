import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TalkWithDbService}from '../talk-with-db.service';
import {CommonInfoService} from '../common-info.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
  complaintForm = new FormGroup({
    textbox: new FormControl("")
  })
  message:string;
  constructor(public router:Router,public talkWithDbService:TalkWithDbService,public commonInfoService:CommonInfoService) {
   this.message="";
   }

  ngOnInit(): void {
     
  }
  complaintEventHandler()
  {
    var obj=this.complaintForm.value.textbox;
    this.complaintForm.value.textbox="";
    this.message="We received your complaint.."
    this.talkWithDbService.complaint(obj)
    .subscribe((data)=>{
      console.log(data);
    },
    (err)=>{
      console.log(err);
    })
  }
}
