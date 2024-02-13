import { Component } from '@angular/core';
import { Hero } from '../hero';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';
import { /* . . . */ NgFor, /* . . . */} from '@angular/common';
import { /* . . . */ FormsModule, /* . . . */} from '@angular/forms';
import { /* . . . */ NgIf, /* . . . */} from '@angular/common';
import { /* . . . */ UpperCasePipe, /* . . . */} from '@angular/common';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    HeroDetailComponent,
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    RouterModule
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent {
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  
  
  heroes: Hero[] = [];

  selectedHero?: Hero;

  

onSelect(hero: Hero): void {
  this.selectedHero = hero;
  this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  
}

getHeroes(): void {
  this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
}

ngOnInit(): void {
  this.getHeroes();
}



add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.heroService.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
}

delete(hero: Hero): void {
  this.heroes = this.heroes.filter(h => h !== hero);
  this.heroService.deleteHero(hero.id).subscribe();
}

}
