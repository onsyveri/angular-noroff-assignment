import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
const {apiPokemons} = environment
@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemons: Pokemon[] = []; 
  private _error: string = ""; 
  private _loading: boolean = false; 

  get pokemons(): Pokemon[] {
    return this._pokemons; 
  }

  get error(): string{
    return this._error
  }

  get loading(): boolean {
    return this._loading; 
  }

  //Alternative method to display our pokemons
  getPokemonsAlt() {
  return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=15`)
  }

  //Alternative method cont. 
  getMorePokemonData(name: string){
  return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`)

  }

  

  constructor(private readonly http: HttpClient) { }

  /*
  public findAllPokemons(): void {
    this._loading = true; 
    this.http.get<Pokemon[]>(apiPokemons)
    .pipe(
      finalize(() => {
        this._loading = false; 
      })
    )
    .subscribe({
      next: (pokemons: Pokemon[]) => {
        this._pokemons = pokemons; 
        console.log("test" + this._pokemons); 
 

      }, 
      error: (error: HttpErrorResponse) => {
        this._error = error.message; 
      }
    })
 }
 */
}
