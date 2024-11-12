import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { RegisterComponent } from './modules/auth/component/register/register.component';
import { SecuredComponent } from './modules/auth/component/secured/secured.component';
import { authenticationGuard } from './modules/auth/authentication.guard';
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
         component: CategoryComponent
    },
    {
        path:"producto",
        component: ProductComponent
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
    {
        path: 'secured',
        component: SecuredComponent, 
        canActivate: [authenticationGuard]
    },
    {
        path: 'region',
        component: RegionComponent
    },
    {
        path: 'cliente',
        component: CustomerComponent
    },
    {
        path: 'cliente/:rfc',
        component: CustomerImageComponent
    },
    {
        path: 'invoice',
        component: InvoiceComponent
    },
    {
        path: 'cart',
        component: CartComponent
    }
]
