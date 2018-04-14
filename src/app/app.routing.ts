import { Routes, RouterModule } from '@angular/router';

import { LogInComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component'
import { ChatComponent } from './component/chat/chat.component'
import { AuthGuard } from './service/auth.guard'

const appRoutes: Routes = [
    { path: '', component: LogInComponent },
    { path: 'login', component: LogInComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);