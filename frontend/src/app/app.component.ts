import { Data } from './shared/model/data.model';
import { AuthService } from './shared/service/auth.service';
import { User } from './shared/model/user.model';
import { KeycloakService } from './shared/service/keycloak.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    profile: User
    data: Data[]

    constructor(private keycloakService: KeycloakService,
        private authService: AuthService) {
    }

    public ngOnInit(): void {
        this.profile = this.keycloakService.getUser()
        this.authService.login(this.profile)
    }

    public post() {
        this.authService.post().subscribe(
            res => {
                this.data = res
            }
        )
    }
    
    public logout() {
        this.authService.logout()
    }
}
