import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profilebanquier',
  templateUrl: './profilebanquier.component.html',
  styleUrls: ['./profilebanquier.component.scss']
})
export class ProfileBanquierComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.setItem('selectedItem','2');
  }

}
