import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { TalkWithDbService } from '../talk-with-db.service';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  Alldata :any;
  
  DataForm = new FormGroup({
    Name: new FormControl(""),
    Address: new FormControl(""),
    MobileNo: new FormControl(""),
  })
  constructor(public router:Router,public talkWithDbService: TalkWithDbService) { 
    
  }
   
  ngOnInit(): void {
    console.log(history.state);
  }
  
  orderEventHandler()
  {
    
    this.talkWithDbService.getCartItems()
    .subscribe((data)=>{
     this.Alldata=data;
     console.log("----");
     console.log(this.Alldata);
     this.Alldata.Name=this.DataForm.value.Name;
     this.Alldata.Address=this.DataForm.value.Name;
     this.Alldata.MobileNo=this.DataForm.value.Name;
     console.log(this.Alldata);
     this.talkWithDbService.updateOrderHistory(this.Alldata)
    .subscribe((data)=>{
      var Valid: any = data["message"];
        console.log(Valid);
    },(err) => {
      console.log(err);
    });
    this.talkWithDbService.removeAllItems()
        .subscribe((data)=>{
          var Valid: any = data["message"];
            console.log(Valid);
        },(err) => {
          console.log(err);
        });
    },(err) => {
      console.log(err);
    });
    
    
    this.router.navigateByUrl("/home");
  }
}
