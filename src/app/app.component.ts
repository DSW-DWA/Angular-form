import { Component, OnInit} from '@angular/core';

import apartments from './apartments.json';
import { Apartment } from './interfaces';

import houses from './houses.json';
import { House } from './interfaces';

import persons from './persons.json';
import { Person } from './interfaces';


import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  // initialization variables
  idSelectHouse: number = 0;
  HOUSES: House[] = houses;
  myControl = new FormControl();
  options: Apartment[] = [...apartments];
  filteredOptions!: Observable<Apartment[]>;
  selectedValue:Apartment ={
    id: -1,
    hid: -1,
    name:"",
    area:-1
  };
  optionForChild: Person[] = [...persons];

  myControl1 = new FormControl();
  filteredOptions1!: Observable<Person[]>;

  // change option for filter
  ChangeOpt(){
    this.options.length = 0;
    let NameSelectHouse: string;
    this.HOUSES.forEach(element =>{
      if (element.id == this.idSelectHouse ) {NameSelectHouse = element.name; return}
    })
    apartments.forEach(item => {
      if (item.hid == this.idSelectHouse) this.options.push(item);
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  ngOnInit() {
    this.options.forEach(item =>{
      let ind:number = this.options.indexOf(item);
      this.HOUSES.forEach(element =>{
        if (element.id == this.options[ind].hid) {this.options[ind].name = element.name + ", " + this.options[ind].name;}
      })
    })
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
    this.filteredOptions1 = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter1(name) : this.optionForChild.slice())),
    );
  }
  // filter
  private _filter(name: string): Apartment[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  private _filter1(name: string): Person[] {
    const filterValue = name.toLowerCase();

    return this.optionForChild.filter(optionForChild => optionForChild.name.toLowerCase().includes(filterValue));
  }
  // displayFn for visualisation in mat-autocmoplete
  displayFn(Apart: Apartment): string {
    return Apart && Apart.name ? Apart.name : '';
  }
  displayFn1(Apart: Person): string {
    return Apart && Apart.name ? Apart.name : '';
  }
  show(){
    this.optionForChild.length = 0;
    persons.forEach(element=>{
      if ( this.selectedValue.id == -1 ||element.aid == this.selectedValue.id) this.optionForChild.push(element);
    })
    this.filteredOptions1 = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter1(name) : this.optionForChild.slice())),
    );
  }
}
