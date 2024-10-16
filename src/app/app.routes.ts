import { Routes } from '@angular/router';
import { CategoryComponent } from './modules/product/component/category/category.component';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { RegisterComponent } from './modules/auth/component/register/register.component';
import { SecuredComponent } from './modules/auth/component/secured/secured.component';
import { authenticationGuard } from './modules/auth/authentication.guard';


export const routes: Routes = [
    {path: "categoria", component: CategoryComponent}, // también puede se "category". Según como quieras mantener tus rutas: en español o en inglés.
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
