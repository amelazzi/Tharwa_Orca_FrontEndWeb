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


    //test a enlever
    localStorage.setItem('token_access',"SkCWpa8TzBdFXVP9SQS21WgJwFJZfXJpxDQqIiq5v25LBXZobWnfNXUqlByuEJ1mhJhVubl04b2m2DZbpzqmDWn9rjDU4hHDMiKi9Drr9buSQXNduHrOMsyrXCYXhj6fZt5oczRso0BQlSeKY5BJRLjQt4Cm0bgPxN7EMbHo27HOaZrhmMXQDpErwoPRGvLHYvy4aJlxs1pJl5SDo6ulGOTPEEvJvR1QsVJe0Q18XEBWW4gR2H9pcc1tRwVzDrs");

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