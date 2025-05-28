import { Routes } from '@angular/router';
import { NotfoundComponent } from './components/Pages&COM/notfound/notfound.component';
import { HomeComponent } from './components/Pages&COM/home/home.component';
import { AboutComponent } from './components/Pages&COM/about/about.component';
import { MenuComponent } from './components/All-Menu/menu/menu.component';
import { ContactComponent } from './components/ContactMe/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddToMenuComponent } from './components/All-Menu/add-to-menu/add-to-menu.component';
import { EventsComponent } from './components/All-Events/events/events.component';
import { AddEventsComponent } from './components/All-Events/add-events/add-events.component';
import { MenuForAdminComponent } from './components/All-Menu/menu-for-admin/menu-for-admin.component';
import { AllMessagesComponent } from './components/ContactMe/all-messages/all-messages.component';
import { AdminAllDishsForClientComponent } from './components/Your-Dishes/admin-all-dishs-for-client/admin-all-dishs-for-client.component';
import { MenuFromClientsComponent } from './components/Your-Dishes/menu-from-clients/menu-from-clients.component';
import { CreateYourDishComponent } from './components/Your-Dishes/create-your-dish/create-your-dish.component';
import { AdminEventsComponent } from './components/All-Events/admin-events/admin-events.component';
import { AddFeedBackComponent } from './components/ContactMe/add-feed-back/add-feed-back.component';
import { AllFeedBackComponent } from './components/ContactMe/all-feed-back/all-feed-back.component';

// ✅ استيراد الحارس
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'Home', pathMatch: 'full' },

  // ✅ صفحات عامة
  { path: 'Home', component: HomeComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Menu', component: MenuComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'AddFeedBack', component: AddFeedBackComponent },
  { path: 'Events', component: EventsComponent},
  { path: 'CreateYourDish', component: CreateYourDishComponent },
  { path: 'MenuFromClients', component: MenuFromClientsComponent},

  // ✅ صفحات تتطلب تسجيل دخول
  { path: 'SignUp', component: SignUpComponent , canActivate: [authGuard] },
  { path: 'AddToMenu', component: AddToMenuComponent, canActivate: [authGuard] },
  { path: 'MenuForAdmin', component: MenuForAdminComponent, canActivate: [authGuard] },
  { path: 'AllMessages', component: AllMessagesComponent, canActivate: [authGuard] },
  { path: 'AllFeedBack', component: AllFeedBackComponent, canActivate: [authGuard] },
  { path: 'AddEvents', component: AddEventsComponent, canActivate: [authGuard] },
  { path: 'AdminEvents', component: AdminEventsComponent, canActivate: [authGuard] },
  { path: 'AdminAllDishsForClient', component: AdminAllDishsForClientComponent, canActivate: [authGuard] },

  // ✅ صفحة الخطأ
  { path: '**', component: NotfoundComponent },
];
