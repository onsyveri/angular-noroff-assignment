import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FavourtieService } from 'src/app/services/favourtie.service';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.css']
})
export class FavouriteButtonComponent implements OnInit {

  @Input() pokemonName: string =""; 

  get loading(): boolean{
    return this.favourtieService.loading;
  } 

  constructor(
    private readonly favourtieService : FavourtieService
  ) { }

  ngOnInit(): void {
  }


  pokemonAdded = "None"; 
  public pokemonCart = []; 

  onFavouriteClick(): void {
    //Add pokemon to favourites/inventory 
    alert("You caught: " + this.pokemonName)
   
    //.......
    this.favourtieService.addToFavourites(this.pokemonName).subscribe({
      next: (response: any) => {
        console.log("NEXT", response); 

      }, 
      error: (error: HttpErrorResponse) =>{
        console.log("Error", error.message)
      }
    })
  }

}
