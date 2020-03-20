import { Injectable } from '@angular/core';
import { Http, Request, XHRBackend, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';

import { KeycloakService } from './keycloak.service';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

/**
 * This provides a wrapper over the ng2 Http class that insures tokens are refreshed on each request.
 */
@Injectable()
export class KeycloakHttp extends Http {
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions, private _keycloakService: KeycloakService) {
        super(_backend, _defaultOptions);
    }

    request(url: Request, options?: RequestOptionsArgs): Observable<Response> {
        const tokenPromise: Promise<string> = this._keycloakService.getToken();
        const tokenObservable: Observable<string> = Observable.fromPromise(tokenPromise);
         
        return tokenObservable
        .map(token => {
            url.headers.set('Authorization', 'Bearer ' + token);
            return url;
        })
        .concatMap(request => super.request(request));
    }
}

export function keycloakHttpFactory(backend: XHRBackend, defaultOptions: RequestOptions, keycloakService: KeycloakService) {
    return new KeycloakHttp(backend, defaultOptions, keycloakService);
}

export const KEYCLOAK_HTTP_PROVIDER = {
    provide: Http,
    useFactory: keycloakHttpFactory,
    deps: [XHRBackend, RequestOptions, KeycloakService]
};
