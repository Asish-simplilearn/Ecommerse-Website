import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { passwordValidator } from '../validators/passwordValidator';
import { passwordMatchValidator } from '../validators/passwordMatchValidator';
import { TalkWithDbService } from '../talk-with-db.service';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  styleObj:object;
  valid:boolean;                                    
  userName:string;
  password:string;
  repasssword:string;
  userValidationFailMessage:string;
  registrationForm = new FormGroup({
    userName: new FormControl("",[Validators.email, Validators.required]),
    password: new FormControl("",passwordValidator),
    repassword: new FormControl("",passwordValidator),
  },
  {
     validators:passwordMatchValidator('password','repassword')
  })    
  constructor(public router:Router,public talkWithDbService : TalkWithDbService) {
    this.valid=false;
    this.styleObj={"color":"red"};
   }

  ngOnInit(): void {
  }
   

  loginPageEventHandler()
  {   
    var user={
      userName: this.registrationForm.value.userName,
      password: this.registrationForm.value.password
    };
    this.talkWithDbService.addUser(user)
    .subscribe((data) => {
      var Valid: any = data["message"];
      console.log(Valid);
      if (Valid) {
        this.userValidationFailMessage = "Username Already Exists";   
      }
      else {
        this.router.navigateByUrl("/login");
      }
    },
    (err)=>{
     console.log(err);
    })

    //return back to login page if Registration is sucessful
    if(this.valid)
    this.router.navigateByUrl('/login');
  }
}
