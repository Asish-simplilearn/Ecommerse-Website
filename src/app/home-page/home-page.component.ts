import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TalkWithDbService}from '../talk-with-db.service';
import {CommonInfoService} from '../common-info.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  userName:string;
  loggedIn:boolean;
  currElement:object;
  Size:string;
  pricerange:string;
  brandname:string;
  allitems;
  pumaitems;
  adidasitems;
  constructor(public router:Router,public talkWithDbService:TalkWithDbService,public commonInfoService:CommonInfoService) { 
    this.loggedIn=false;
    this.Size="NA";
    this.pricerange="NA";
    this.brandname="NA";
  }
  ngOnInit(): void {
   this.userName=this.commonInfoService.userName;
   if(this.userName !== "admin")
   {
    this.loggedIn=true;
   }
    this.talkWithDbService.getAllShirts()
    .subscribe((data)=>{
      console.log("ok");
      console.log(data);
      this.allitems=data;
      this.pumaitems =  this.allitems.filter(function(item) {
        return item.brand == "puma";
    });
    
    this.adidasitems =  this.allitems.filter(function(item) {
      return item.brand == "adidas";
  });
     /* Object.entries(data).map(item => {
        if(item[1].brand=="puma")
        {
                  
        }
      })
      this.adidasitems Object.entries(data).forEach(item => {
      })*/
  
    },
    (err)=>{
      console.log(err);
    })
  }
  
 
  loginPageEventHandler()
  {
    console.log("going to login page");
    this.router.navigateByUrl("/login",{state:{Link:"home"}});
  }
  
  addItemToCartEventHandler(item)
  {
    console.log(item);

     if(this.loggedIn){
       var obj={brand:item.brand,quantity:1,ItemNo:item.itemNo,size:item.size,cost:item.cost};
       console.log(obj);
       this.talkWithDbService.addShirt(obj)
       .subscribe((data)=>{
        var Valid: any = data["message"];
        console.log(Valid);
       },(err)=>{
        console.log(err);
       })
     }
     else{
       this.router.navigateByUrl("/login",{state:{Link:"cart"}});
     }
  }

  cartPageEventHandler()
  {
    if(this.loggedIn){
      this.router.navigateByUrl("/cart");
    }
    else{
      this.router.navigateByUrl("/login",{state:{Link:"cart"}});
    }
  }

  userInfoEventHandler()
  {
    if(this.loggedIn){
      this.router.navigateByUrl("/userinfo");
    }
    else{
      this.router.navigateByUrl("/login",{state:{Link:"userinfo"}});
    }
  }
}
