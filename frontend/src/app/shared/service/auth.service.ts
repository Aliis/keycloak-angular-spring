import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { KeycloakService } from './keycloak.service';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { Data } from '../model/data.model';

@Injectable()
export class AuthService {

    profile: User

    constructor(private http: Http, private keycloakService: KeycloakService) { }

    login(user) {
        const url = `${environment.BACKEND_URL}/login`;
        const userdata = { username: user.username, password: user.password }
        this.http.post(url, userdata, {withCredentials: true})
            .subscribe(res => console.log('login', res))
    }

   public post(): Observable<Data[]> {
        const url = `${environment.BACKEND_URL}/post`
        return this.http.post(url, {withCredentials: true})
            .map(res => res.json())
            .do(value => console.log('post', value))
    }

    logout() {
        const url = `${environment.BACKEND_URL}/logout`;
        this.http.get(url, {withCredentials: true})
            .subscribe(() => this.keycloakService.logout())
    }
}