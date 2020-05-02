import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { ItemsListComponent } from './shared-components/items-list/items-list.component';
import { ItemsCustomerComponent } from './items-customer/items-customer.component';
import { ItemsShopOwnerComponent } from './items-shop-owner/items-shop-owner.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ResponseMessagesComponent } from './shared-components/response-messages/response-messages.component';
import { CartFormComponent } from './shared-components/cart-form/cart-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ItemsListComponent,
    ItemsCustomerComponent,
    ItemsShopOwnerComponent,
    ItemFormComponent,
    ResponseMessagesComponent,
    CartFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
