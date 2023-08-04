import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';




@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    CoreModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
    AppRoutingModule,
    HomeModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
