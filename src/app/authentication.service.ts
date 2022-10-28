import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { UserSession } from './models/user-session.model';
import { Tokens } from './models/tokens.model';
import { APIURL } from './models/api.model';

import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user_session: UserSession;

  constructor(private http: HttpClient) {
    this.user_session = new UserSession;
  }

  requestTokens(loginDetails: any): Observable<UserSession> {
    return this.http.post<Tokens>(`${APIURL}/token/`, loginDetails).pipe(
      map(
        (tokens: Tokens) => {
          console.log(tokens)
          this.user_session = { ...tokens };
          return this.user_session;
        }
      )
    );
  }

  refreshTokens() {

  }

  requestUser(userSession: Observable<UserSession>): any {
    return this.http.get<UserSession>(`${APIURL}/currentuser/`, {
      headers: {
        "Authorization": this.user_session.access as string
      }
    }).pipe(
      map(
        (user: any) => {
          return { ...user, ...userSession }
        }
      )
    )
  }

  loginUser(loginDetails: any) {
    console.log(`Logging in as ${loginDetails[0]}`)
    return this.requestUser(this.requestTokens(loginDetails)).pipe(
      map(
        (user: UserSession) => {
          console.log;
        }
      )
    );
  }



  /*
    An attempt to merge requestTokens and requestUser into one login function.
    I'm feeling close to something. I probably shouldn't do this...
  */
  // loginUser(loginDetails: any): Observable<UserSession> {
  //   let tokens!: Tokens;
  //   this.http.post<Tokens>(`${APIURL}/token/`, loginDetails).pipe(
  //     map(
  //       (token: any) => {
  //         tokens = {...token}
  //       }
  //     )
  //   );

  //   let user: Observable<UserSession> = this.http.get<UserSession>(`${APIURL}/currentuser/`, {
  //     headers: {
  //       "Authorization": tokens.access as string
  //     }
  //   }).pipe(
  //     map(
  //       (user: UserSession) => {
  //         return { ...user, ...tokens }
  //       }
  //     )
  //   );

  //   return user;
  // }
}
