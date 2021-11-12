import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'gb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  searchFor(searchForm: NgForm): void {
    let data = searchForm.value;
    let searchTerm = data.term;

    this.router.navigate(['search'], {
      queryParams: {
        term: searchTerm
      }
    });
  }

}
