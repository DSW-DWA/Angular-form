// import data for houses
import houses from './houses.json'
import { House } from './interfaces'
//import data for apartments
import apartments from './apartments.json'
import { Apartment } from './interfaces'
//import data for persons
import persons from './persons.json'
import { Person } from './interfaces'

// export all data
export let HOUSES: House[] = houses;
export let APARTMENT: Apartment[] = apartments;
export let PERSONS: Person[] = persons;