import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { FavouriteButtonComponent } from './components/favourite-button/favourite-button.component';
import { NavbarComponent } from './components/navbar/navbar.component'

@NgModule({
  declarations: [ // Components
    AppComponent,
    LoginPage,
    PokemonCataloguePage,
    TrainerPage,
    LoginFormComponent,
    PokemonListComponent,
    FavouriteButtonComponent,
    NavbarComponent,
  ],
  imports: [ // Modules
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
