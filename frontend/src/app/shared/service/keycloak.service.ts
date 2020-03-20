import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { environment } from '../../../environments/environment';

declare var Keycloak: any;

@Injectable()
export class KeycloakService {
    static auth: any = {};
    static user: User;

    static init(): Promise<any> {
        const keycloakAuth: any = Keycloak({
            url: environment.KEYCLOAK_URL,
            realm: environment.KEYCLOAK_REALM,
            clientId: environment.KEYCLOAK_CLIENTID
        });

        KeycloakService.auth.loggedIn = false;

        return new Promise((resolve, reject) => {
            keycloakAuth
                .init({ onLoad: 'login-required' })
                .success(() => {
                    KeycloakService.auth.loggedIn = true;
                    KeycloakService.auth.authz = keycloakAuth;
                    KeycloakService.auth.logoutUrl =
                        keycloakAuth.authServerUrl +
                        '/realms/' +
                        environment.KEYCLOAK_REALM +
                        '/protocol/openid-connect/logout?redirect_uri=' +
                        document.baseURI;

                    KeycloakService.auth.authz.loadUserProfile().success(data => {
                        this.user = new User();
                        this.user.username = data.username;

                        resolve();
                    });
                })
                .error(() => {
                    reject();
                });
        });
    }

    logout() {

        console.log('*** LOGOUT');
        KeycloakService.auth.loggedIn = false;
        KeycloakService.auth.authz = null;

        window.location.href = KeycloakService.auth.logoutUrl;
    }

    getToken(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (KeycloakService.auth.authz.token) {
                KeycloakService.auth.authz
                    .updateToken(90) // refresh token if it will expire in 90 seconds or less
                    .success(() => {
                        resolve(<string>KeycloakService.auth.authz.token);
                    })
                    .error(() => {
                        reject('Failed to refresh token');
                    });
            } else {
                reject('Not logged in');
            }
        });
    }

    getUser(): User {
        return KeycloakService.user;
    }
}
