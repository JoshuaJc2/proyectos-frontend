import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { RegisterComponent } from './modules/auth/component/register/register.component';
import { SecuredComponent } from './modules/auth/component/secured/secured.component';
import { authenticationGuard } from './modules/auth/authentication.guard';
import { CategoryComponent } from './modules/product/component/category/category.component';
import { ProductComponent } from './modules/product/component/product/product.component';
import { ProductImageComponent } from './modules/product/component/product-image/product-image.component';
import { MainComponent } from './modules/layout/component/main/main.component';

export const routes: Routes = [
    {
        path:"",
        component : MainComponent
    },
    {path: "categoria",
         component: CategoryComponent
    }, // también puede se "category". Según como quieras mantener tus rutas: en español o en inglés.
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
    }

]
