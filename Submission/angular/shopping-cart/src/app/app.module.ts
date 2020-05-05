import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { ItemsListComponent } from './shared-components/items-list/items-list.component';
import { ItemsCustomerComponent } from './customer/items-customer/items-customer.component';
import { ItemsShopOwnerComponent } from './shopOwner/items-shop-owner/items-shop-owner.component';
import { ItemFormComponent } from './shopOwner/item-form/item-form.component';
import { ResponseMessagesComponent } from './shared-components/response-messages/response-messages.component';
import { CartFormComponent } from './shared-components/cart-form/cart-form.component';
import { CartComponent } from './customer/cart/cart.component';
import { OrderHistoryComponent } from './customer/order-history/order-history.component';
import { OrderDetailsPipe } from './pipes/order-details.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ItemsListComponent,
    ItemsCustomerComponent,
    ItemsShopOwnerComponent,
    ItemFormComponent,
    ResponseMessagesComponent,
    CartFormComponent,
    CartComponent,
    OrderHistoryComponent,
    OrderDetailsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
