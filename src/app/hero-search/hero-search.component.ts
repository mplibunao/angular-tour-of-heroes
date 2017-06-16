import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from '../hero-search.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {

  heroes: Observable<Hero[]>;
  // search terms produces an Observable of strings used as a filter criteria for the search
  private searchTerms = new Subject<string>(); // Subject is producer of an observable event stream

  constructor(private heroSearchService: HeroSearchService,
              private router: Router) { }

  ngOnInit(): void {
    // turn the stream of search terms into a stream of Hero arrays and assign to heroes property
    this.heroes = this.searchTerms
      .debounceTime(300)  // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged() // ignore if next search term is same as previous
      .switchMap(term => term /* switch to a new observable each time the term changes;
      Cancels and discards previous search observables, returning only the latest search service observable */
      ? this.heroSearchService.search(term) // return the http search observable
      : Observable.of<Hero[]>([])) // or the observable of empty heroes if there was no search term
      .catch(error => {
        console.log(error);
        // Clear search results by returning an observable containing an empty array
        return Observable.of<Hero[]>([]);
      });
  }

  // Push a search term into the observable stream
  search(term: string): void {
    // each call to search puts a new string into this subject's observable stream by calling next()
    this.searchTerms.next(term);
  }

  goToDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }

}
