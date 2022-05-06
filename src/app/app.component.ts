import { Component, OnInit} from '@angular/core';

import apartments from './apartments.json'
import { Apartment } from './interfaces'

import houses from './houses.json'
import { House } from './interfaces'

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  HOUSES: House[] = houses;

  myControl = new FormControl();
  options: Apartment[] = apartments;
  filteredOptions!: Observable<Apartment[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  private _filter(name: string): Apartment[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  displayFn(Apart: Apartment): string {
    return Apart && Apart.name ? Apart.name : '';
  }
  selectedValue = null;
  title = 'form';
  show(){
    console.log(this.selectedValue);
  }
}
