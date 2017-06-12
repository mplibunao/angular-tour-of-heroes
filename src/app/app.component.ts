import { Component } from '@angular/core';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(){}

  title: string = 'Tour of Heroes';
}
