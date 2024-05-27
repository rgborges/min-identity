import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { userLoginRequest } from '../models/userLogin.model';

@Injectable({
      providedIn: 'root'
})
export class TokenService {
      /**
       *
       */
      private apiUrl: string = 'http://localhost:3333/api/Token/getToken';

      constructor(private http: HttpClient) {
           
      }
     /**
      * 
      * @param request username and password informed by the user
      * @returns 
      */ 
      signin(request: userLoginRequest) : String {
            //TODO: call token endpoint from API and save locally
            return "";
      }
}