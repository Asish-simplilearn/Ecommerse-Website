import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TalkWithDbService} from './talk-with-db.service';
import { CommonInfoService} from './common-info.service'
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { CartPageComponent } from './cart-page/cart-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ContactPageComponent,
    AboutUsPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    CartPageComponent,
    OrderPageComponent,
    UserInfoPageComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TalkWithDbService,CommonInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
