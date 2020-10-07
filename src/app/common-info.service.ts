import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonInfoService {
  userName:string;
  upadteStatus:boolean;
  constructor() { 
    this.userName="admin";
    this.upadteStatus=false;
  }
  
  updateUserName(obj)
  {
    this.userName=obj;
    this.upadteStatus=true;
    return {message:true};
  }
  getLogInStatus()
  {
   return this.upadteStatus;
  }
}
