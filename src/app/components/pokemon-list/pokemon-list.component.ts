import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

 // @Input() pokemons: Pokemon[] = []; 

  @Input() pokemons: any[] = [];

  constructor(
    private pokemonService: PokemonCatalogueService 
  
  ) { }

  //Alt method to fetch pokemons 
  ngOnInit(): void {
    this.pokemonService.getPokemonsAlt().subscribe((response: any) =>{
      console.log(this.pokemons)
      response.results.forEach((result: { name: string; }) => {
        this.pokemonService.getMorePokemonData(result.name).subscribe((response: any) => {
          this.pokemons.push(response);
          console.log(this.pokemons);
        })
      })

    })
  }

}
