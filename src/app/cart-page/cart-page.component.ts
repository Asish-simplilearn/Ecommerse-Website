import { Component, OnInit } from '@angular/core';
import { TalkWithDbService } from '../talk-with-db.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  TotalAmount: number;
  items;
  constructor(public router: Router, public talkWithDbService: TalkWithDbService) {
    this.TotalAmount = 0;
  }

  ngOnInit(): void {
    this.talkWithDbService.getCartItems()
      .subscribe((data) => {
        console.log(data);
        this.items = data;
        
        Object.entries(data).map(item => {
          console.log(item[1].itemdata);
          this.TotalAmount+=(item[1].itemdata.quantity)*(item[1].itemdata.cost);
        })
        //create card
      }, (err) => {
        console.log(err);
      });
  }

  removeItemEventHandler(data) {
    console.log(data.itemdata);
    this.talkWithDbService.removeCartItem(data.itemdata)
      .subscribe((data) => {
        var Valid: any = data["message"];
        console.log(Valid);
        // this.TotalAmount-=Value;
        this.talkWithDbService.getCartItems()
          .subscribe((data) => {
            console.log(data);
            this.items = data;
            this.TotalAmount=0;
            Object.entries(data).map(item => {
              this.TotalAmount+=(item['itemdata'].quantity)*(item['itemdata'].price);
            })
            
            //create card
          }, (err) => {
            console.log(err);
          });
      }, (err) => {
        console.log(err);
      });


  }

  orderPageEventHandler() {
    this.router.navigateByUrl("/order");
  }
}
