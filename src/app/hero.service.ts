import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-hero';

@Injectable()
export class HeroService {

  constructor() { }

  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }

  // emulate slow loading of data by creating asynchronously delaying the resolution of the promise
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

}
