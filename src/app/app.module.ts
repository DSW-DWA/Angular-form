import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { AutocompletePeopleComponent } from './autocomplete-people/autocomplete-people.component';

@NgModule({
  declarations: [
    AppComponent,
    AutocompletePeopleComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
