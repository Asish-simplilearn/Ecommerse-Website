import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../validators/passwordValidator';
import { TalkWithDbService } from '../talk-with-db.service';
import {CommonInfoService} from '../common-info.service'
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  styleObj:object;
  userValidationFailMessage: string;
  NavigateToPreviousPage: string;
  loginForm = new FormGroup({
    userName: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("" ,passwordValidator),
  })

  constructor(public router: Router, public talkWithDbService: TalkWithDbService,public commonInfoService:CommonInfoService) {
    this.NavigateToPreviousPage = "";
    this.styleObj={"color":"red"};
  }

  ngOnInit(): void {
    console.log(3);
    console.log(history.state.Link);
    if (history.state.Link)
      this.NavigateToPreviousPage = history.state.Link;
  }



  //Submit Button Event 
  homePageEventHandler() {
    var user = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password
    };
    this.talkWithDbService.doUserValidation(user)
      .subscribe((data) => {
        console.log(data);
        var Valid: any = data["message"];
        console.log(Valid);
        if (Valid) {
          this.commonInfoService.updateUserName(this.loginForm.value.userName);
          console.log(this.NavigateToPreviousPage);
          if (this.NavigateToPreviousPage)
            this.router.navigateByUrl("/home");
          else
            this.router.navigateByUrl("/" + this.NavigateToPreviousPage);
        }
        else {
          console.log("not match");
          this.userValidationFailMessage = "Please enter valid credentials";
        }
      },
        (err) => {
          console.log(err);
        });
  }
  //SignIn Button Event
  registartionPageEventHandler() {
    console.log("ok");
    this.router.navigateByUrl("/register");
  }
}
