import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CommonInfoService} from "./common-info.service";
@Injectable({
  providedIn: 'root'
})
export class TalkWithDbService {
  serverUrl:string;
  myServerUrl:string;
  constructor(public httpClient:HttpClient,public commonInfoServices:CommonInfoService ) {
    this.serverUrl="http://localhost:3000/";
    console.log(this.commonInfoServices.userName);
   }


   
  doUserValidation(obj)
  {
    var myServerUrl=this.serverUrl+"api/login";
    return this.httpClient.post(myServerUrl,obj);
  }
  addUser(obj)
  {
    var myServerUrl=this.serverUrl+"api/register";
    return this.httpClient.post(myServerUrl,obj);
  }




  getAllShirts()
  {
    var myServerUrl=this.serverUrl+"api/allshirts";
    return this.httpClient.get(myServerUrl);
  }




  addShirt(obj)
  {
    var userobj={username:this.commonInfoServices.userName,itemdata:obj,itemNo:obj.ItemNo};
    var myServerUrl=this.serverUrl+"api/cart/addShirt";
    return this.httpClient.post(myServerUrl,userobj);
  }
  getCartItems()
  {
    var userobj={username:this.commonInfoServices.userName};
    var myServerUrl=this.serverUrl+"api/cart/getCartItems";
    return this.httpClient.post(myServerUrl,userobj);
  }
  removeAllItems()
  {
    var userobj={username:this.commonInfoServices.userName};
    var myServerUrl=this.serverUrl+"api/cart/removeAllCartItems";
    return this.httpClient.post(myServerUrl,userobj);
  }
  removeCartItem(obj)
  {
    var userobj={username:this.commonInfoServices.userName,itemdata:obj};
    var myServerUrl=this.serverUrl+"api/cart/removerCartItem";
    return this.httpClient.post(myServerUrl,userobj);
  }



  getOrderHistory()
  {
    console.log(1000);
    var userobj={username:this.commonInfoServices.userName};
    console.log(userobj);
    var myServerUrl=this.serverUrl+"api/orderHistory/getOrderHistory";
    return this.httpClient.post(myServerUrl,userobj);
  }
  updateOrderHistory(obj)
  {
    var date_time = new Date();
    var userobj={username:this.commonInfoServices.userName,Time:date_time,AllItemsOrdered:obj};
    var myServerUrl=this.serverUrl+"api/orderHistory/updateOrderHistory";
    return this.httpClient.post(myServerUrl,userobj);
  }



  getUserInfo()
  {
    var userobj={username:this.commonInfoServices.userName};
    var myServerUrl=this.serverUrl+"api/userInfo/userData";
    return this.httpClient.post(myServerUrl,userobj);
  }
  updateUserInfo(obj)
  {
    var userobj={username:this.commonInfoServices.userName,userdata:obj.data,updateField:obj.updateField};
    var myServerUrl=this.serverUrl+"api/userInfo/updateUserData";
    return this.httpClient.post(myServerUrl,userobj);
  }
  complaint(obj)
  {
    console.log(obj);
    var date_time = new Date();
    var userobj={username:"aaa"/*this.commonInfoServices.userName*/,Time:date_time,complaint:obj};
    var myServerUrl=this.serverUrl+"api/userInfo/complaint";
    return this.httpClient.post(myServerUrl,userobj);
  }
}

  