import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { TrainerService } from './trainer.service';

const {apiKey, apiTrainers} = environment

@Injectable({
  providedIn: 'root'
})
export class FavourtieService {

  private _loading: boolean = false; 

  get loading(): boolean {
    return this._loading;
  }


  constructor(
    private http: HttpClient,
    private readonly pokemonService : PokemonCatalogueService,
    private readonly trainerService: TrainerService) { 
  }
  //get the pokemon based on the name 

  //patch request to our server  the user.id and the pokemon
  public addToFavourites(pokemonName: string): Observable<Trainer> {
    console.log("clicked button test")
    

    if(!this.trainerService.trainer){
      throw new Error ("addToFavourites: Can't find trainer"); 
      console.log("can't find user")

    }
    const trainer: Trainer = this.trainerService.trainer; 
    const pokemon : Pokemon | undefined = this.pokemonService.pokemonByName(pokemonName); 
    console.log("here " + pokemon?.name); 
    console.log("here2 " + trainer.id);
    console.log("here3: " + trainer.pokemon);
    console.log("here4: " + pokemonName);
    

    if(!pokemon){
      throw new Error("addtofavourites: No pokemon with name" + pokemonName);
    }


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    })

    this._loading = true; 

    
return this.http.patch<Trainer>(`${apiTrainers}/${trainer.id}`, {
  pokemon : [...trainer.pokemon, pokemon.name]

}, {
  headers
})
.pipe(
  tap((updatedTrainer: Trainer) => {
    this.trainerService.trainer = updatedTrainer; 

  }),
  finalize(() => {
    this._loading = false; 
  })
)

  }
}
