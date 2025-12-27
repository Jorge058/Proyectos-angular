import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home-component/home';
import { ArtistDetailComponent } from './Components/artist-detail-component/artist-detail';
import { ArtistsComponent } from './Components/artists-component/artists';
import { Logincomponent } from './Components/logincomponent/logincomponent';
import { authGuard } from './guards/authGuard-guard';

export const routes: Routes = [
  { path: 'login', component: Logincomponent },
  { path: 'Home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'artists', component: ArtistsComponent,canActivate: [authGuard] },
  { path: 'artists/:id', component: ArtistDetailComponent,canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
