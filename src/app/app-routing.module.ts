import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import {UserInfoPageComponent} from './user-info-page/user-info-page.component';
import {OrderPageComponent} from './order-page/order-page.component';
import {CartPageComponent} from './cart-page/cart-page.component';
const routes: Routes = [
  {path:"login",component:LoginPageComponent},
  {path:"register",component:RegisterPageComponent},
  {path:"aboutus",component:AboutUsPageComponent},
  {path:"contactus",component:ContactPageComponent},
  {path:"home",component:HomePageComponent},
  {path:"userinfo",component:UserInfoPageComponent},
  {path:"order",component:OrderPageComponent},
  {path:"cart",component:CartPageComponent},
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"**",component:LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
