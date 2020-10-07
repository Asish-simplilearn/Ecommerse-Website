import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TalkWithDbService}from '../talk-with-db.service';
import {CommonInfoService} from '../common-info.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {
  details:object;
  time:string;
  text:object;
  Namefield:string;
  Addressfield:string;
  PhoneNo:string;
  message:string;
  sdata;
  userForm = new FormGroup({
    Name: new FormControl(""),
    Address: new FormControl(""),
    PhoneNo: new FormControl("")
  })
  constructor(public router:Router,public talkWithDbService:TalkWithDbService,public commonInfoService:CommonInfoService) { 
   this.getOrderHistoryEventHandler();
   this.Namefield="";
   this.Addressfield="";
   this.PhoneNo="";
   this.message="";
  }

  ngOnInit(): void {
    this.talkWithDbService.getUserInfo()
        .subscribe((data)=>{
          console.log(11);
          console.log(data);
            this.createUserData(data);
            
        },(err) => {
          console.log(err);
        });
  }
  NamefieldEventHandler()
  {
    this.updateDetailsEventHandler("Name",this.userForm.value.Name);
  }
  AddressfieldEventHandler()
  {
    this.updateDetailsEventHandler("Address",this.userForm.value.Address);
  }
  PhoneNoEventHandler()
  {
    this.updateDetailsEventHandler("PhoneNo",this.userForm.value.PhoneNo);
  }
  updateDetailsEventHandler(field,text)
  {
    console.log(100);
    console.log(field);
    console.log(text);
   var obj={updateField:field,data:text};
    this.talkWithDbService.updateUserInfo(obj)
        .subscribe((data)=>{
            console.log(data);
            this.message="updated";
        },(err) => {
          console.log(err);
        });
  }
  getOrderHistoryEventHandler()
  {
    console.log(1000);
    this.talkWithDbService.getOrderHistory()
    .subscribe((data)=>{
      console.log(data);
      this.sdata=data;
      console.log(data[0].details.username);
      var name=this.commonInfoService.userName;
      this.sdata =  this.sdata.filter(function(item) {
         return item.details.username == name;
       });

    console.log(10);
    console.log(this.sdata);
      /*Object.entries(data).map(item => {
        console.log(item);
        
        if(this.commonInfoService.userName==item[1].details.username)//
        {
          console.log(item[1].details.Time);
          this.time=item[1].details.Time;           
          if(item[1].details.AllItemsOrdered!=undefined || item[1].details.AllItemsOrdered!=null)
          {
          Object.entries(item[1].details.AllItemsOrdered).map(specificItem => {
           this.createHistory(specificItem[1]);
          })
         }
        }
      })*/
      
    },
    (err)=>{
      console.log(err);
    })
  }
  createUserData(data)
  {
    console.log("-");
    console.log(data.userInfo);
            this.Namefield=data.userInfo.Name;
            this.Addressfield=data.userInfo.Address;
            this.PhoneNo=data.userInfo.PhoneNo;
  }
  /*
  createHistory(data)
  {
    console.log("ok");
    console.log(data.itemdata);
    console.log(this.time.slice(0,10));
    console.log(this.time.slice(11,19));

    var cardElement = document.createElement("card");
          var liElement1=document.createElement('li');
          var liElement2=document.createElement('li');
          var liElement3=document.createElement('li');
          var liElement4=document.createElement('li');
          var liElement5=document.createElement('li');
          var uiElement=document.createElement('ui');
          var divElement=document.createElement('div');
          var imgElement =document.createElement('img');
          var br=document.createElement('br');
          var brand =data.itemdata.brand;
          var size  = data.itemdata.size;
          var cost  = data.itemdata.cost*data.itemdata.quantity;
          var id    = (data.itemdata.itemNo);
          var imgId ='../../assets/img'+id;
          
          
          imgElement.setAttribute("src", imgId);
          divElement.appendChild(imgElement);
          //   console.log(user);
          console.log(brand);
          var liTextcode4 = document.createTextNode("Date -"+this.time.slice(0,10));
          var liTextcode5 = document.createTextNode("Time -"+this.time.slice(11,19));
          var liTextcode1 = document.createTextNode("brand -"+brand);
          var liTextcode2 = document.createTextNode("size  -"+size);
          var liTextcode3 = document.createTextNode("Total cost  -Rs"+cost+"/-");
          liElement1.appendChild(liTextcode1);
          liElement2.appendChild(liTextcode2);
          liElement3.appendChild(liTextcode3);
          liElement4.appendChild(liTextcode4);
          liElement5.appendChild(liTextcode5);
          uiElement.appendChild(liElement4);
          uiElement.appendChild(liElement5);
          uiElement.appendChild(liElement1);
          uiElement.appendChild(liElement2);
          uiElement.appendChild(liElement3);
          
          cardElement.appendChild(divElement);
          cardElement.appendChild(uiElement);
          cardElement.appendChild(br);
          cardElement.classList.add('offset-1 col-9 mx-auto');
          document.getElementById("history").appendChild(cardElement);

  }*/
}
