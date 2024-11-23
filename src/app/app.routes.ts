import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { RegisterComponent } from './modules/auth/component/register/register.component';
import { CategoryComponent } from './modules/product/component/category/category.component';
import { ProductComponent } from './modules/product/component/product/product.component';
import { ProductImageComponent } from './modules/product/component/product-image/product-image.component';
import { MainComponent } from './modules/layout/component/main/main.component';
import { RegionComponent } from './modules/customer/component/region/region.component';
import { CustomerComponent } from './modules/customer/component/customer/customer.component';
import { CustomerImageComponent } from './modules/customer/component/customer-image/customer-image.component';
import { InvoiceComponent } from './modules/invoice/component/invoice/invoice.component';
import { HomeComponent } from './modules/layout/component/home/home.component';
import { CartComponent } from './modules/invoice/component/cart/cart.component';
import { InvoiceDetailComponent } from './modules/invoice/component/invoice-detail/invoice-detail.component';
import { adminGuard } from './core/admin.guard';
import { customerGuard } from './core/customer.guard';

export const routes: Routes = [
    {
        path:"", 
        component : HomeComponent
    },
    {
        path:"main/:id",
        component : MainComponent
    },
    {path: "categoria",
         component: CategoryComponent,
         canActivate: [adminGuard]
    },
    {
        path:"producto",
        component: ProductComponent,
        canActivate: [adminGuard]
    },
    {
        path:"producto/:gtin",
        component : ProductImageComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    //{
    //    path: 'secured',
    //    component: SecuredComponent, 
    //    canActivate: [authenticationGuard]
    //},
    {
        path: 'region',
        component: RegionComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'cliente',
        component: CustomerComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'cliente/:rfc',
        component: CustomerImageComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'invoice',
        component: InvoiceComponent,
        canActivate: [adminGuard, customerGuard]
    },
    {
        path : 'invoice/:id',
        component : InvoiceDetailComponent,
        canActivate: [adminGuard, customerGuard]
    },
    {
        path: 'cart',
        component: CartComponent,
        canActivate: [customerGuard]
    }
]
