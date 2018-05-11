import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-bloquerdebloquer',
  templateUrl: './bloquerdebloquer.component.html',
  styleUrls: ['./bloquerdebloquer.component.scss']
})
export class BloquerdebloquerComponent implements OnInit {

  constructor() { }
  
  mail:String;
  numCompte:String;
  nom:String;
  monnaie : String;
  adr:String;
  tel :String ; 
  fonction: String;

  success : boolean;
  successRecherche : boolean;
  textFailed : String;
  textSuccess: String;
  formCompte:FormGroup;

  action : String;
  lock:String;
  
  
  ngOnInit() {
    localStorage.setItem('selectedItem','5');

    this.formCompte = new FormGroup({
      mail: new FormControl(''),
      nom : new FormControl(''),
      tel : new FormControl(''),
      fonction : new FormControl(''),
      monnaie : new FormControl(''),
      numCompte : new FormControl(''),
      adr : new FormControl('')
    });
  }

  changerStatutCompte()
  {
    
  }

  rechercherCompte()
  {    

  }
}
