import { Component, OnInit } from '@angular/core'; 
import { MDCList } from '@material/list';
import {MDCRipple} from '@material/ripple';
import {MDCDrawer} from "@material/drawer";

@Component({
  selector: 'spa-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss', './material.component.css'],
  
})
export class MaterialComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { 
    const list = MDCList.attachTo(document.querySelector('.mdc-deprecated-list')!);
list.wrapFocus = true;
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer')!);

 

const listEl = document.querySelector('.mdc-drawer .mdc-deprecated-list')!;
const mainContentEl = document.querySelector('.main-content')!;

listEl.addEventListener('click', (event) => {
  drawer.open = false;
});

document.body.addEventListener('MDCDrawer:closed', () => {
   
});
    
  }

  open(){

    const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer')!);

 

const listEl = document.querySelector('.mdc-drawer .mdc-deprecated-list')!;
const mainContentEl = document.querySelector('.main-content')!; 
  drawer.open = true; 

  }

}
