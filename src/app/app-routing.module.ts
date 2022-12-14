import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductFormComponent } from './productform/productform.component';
import { ProductlistComponent } from './productlist/productlist.component';

const routes: Routes = [{path: 'productform', component: ProductFormComponent},
{ path: 'productform/:id', component: ProductFormComponent},
{ path: 'productview/:id', component: ProductViewComponent },
{ path: 'productlist',  component: ProductlistComponent },
{ path: 'productview', component: ProductViewComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
