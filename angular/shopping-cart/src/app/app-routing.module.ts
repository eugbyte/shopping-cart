import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsCustomerComponent } from './items-customer/items-customer.component';
import { ItemsShopOwnerComponent } from './items-shop-owner/items-shop-owner.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  { path: "items", component: ItemsCustomerComponent },
  { path: "shopOwner", children: [
    { path: "manage/:id", component: ItemFormComponent},
    { path: "manage", component: ItemFormComponent},
    { path: "", component: ItemsShopOwnerComponent}
  ]},
  { path: "cart", component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
