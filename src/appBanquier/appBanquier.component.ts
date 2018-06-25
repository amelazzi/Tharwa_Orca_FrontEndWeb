import { Component } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';

import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './appBanquier.component.html',
  styleUrls: ['./appBanquier.component.scss']
})
export class AppBanquierComponent {
  title = 'banquier';
  constructor(private httpClient:HttpClient){}
  name : String ='';
  selectedItem : number;

  ngOnInit(){



    
    $(document).ready(function(){
      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });


    
  }



}