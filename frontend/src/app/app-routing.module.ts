
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

// import { CrisisListComponent }   from './crisis-list.component';
// import { HeroListComponent }     from './hero-list.component';
// import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  { path: 'login', component: LoginComponent },
  // { path: '', redirectTo: '/test', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
