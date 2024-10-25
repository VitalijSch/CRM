import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { CustomerComponent } from './home/customer/customer.component';
import { OrderComponent } from './home/order/order.component';
import { ProductComponent } from './home/product/product.component';
import { AboutComponent } from './home/about/about.component';
import { AddNewCustomerComponent } from './home/add-new-customer/add-new-customer.component';
import { AddNewOrderComponent } from './home/add-new-order/add-new-order.component';
import { AddNewProductComponent } from './home/add-new-product/add-new-product.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/sign-in', pathMatch: 'full' },
    { path: 'auth', redirectTo: 'auth/sign-in', pathMatch: 'full' },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            { path: 'sign-in', component: SignInComponent },
            { path: 'sign-up', component: SignUpComponent }
        ]
    },
    { path: 'home', redirectTo: 'home/dashboard', pathMatch: 'full' },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'customer', component: CustomerComponent },
            { path: 'add-new-customer', component: AddNewCustomerComponent },
            { path: 'order', component: OrderComponent },
            { path: 'add-new-order', component: AddNewOrderComponent },
            { path: 'product', component: ProductComponent },
            { path: 'add-new-product', component: AddNewProductComponent },
            { path: 'about', component: AboutComponent },
        ]
    }
];
