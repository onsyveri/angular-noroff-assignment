import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';

const { apiTrainers, apiKey } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Dependency Injection.
  constructor(private readonly http: HttpClient) { }

  public login(username: string): Observable<Trainer> {
    return this.checkTrainerName(username)
      .pipe (
        switchMap((trainer: Trainer | undefined) => {
          if (trainer === undefined) {
            return this.createTrainer(username);
          }
          return of(trainer);
        })
      )
  }

  // Login

  // Check if user exist
  private checkTrainerName(username: string): Observable<Trainer | undefined> {
    return this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`)
      .pipe (
        // RxJS operators
        map((response: Trainer[]) => response.pop())
      )
  }

  // IF NOT trainer - Create a trainer
  private createTrainer(username: string): Observable<Trainer> {
    
    const trainer = {
      username,
      pokemons: []
    };
    
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    });
    
    return this.http.post<Trainer>(apiTrainers, trainer, { headers })

  }

  // IF user || created user -> store user  
}
